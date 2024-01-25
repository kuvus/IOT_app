import {
    View,
    FlatList,
    RefreshControl,
    TouchableHighlight,
} from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import {
    Appbar,
    Button,
    List,
    TextInput,
    Text,
    Dialog,
    Portal,
    TouchableRipple,
} from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'
import { useEffect, useState } from 'react'
import { Characteristic } from 'react-native-ble-plx'
import WifiManager from 'react-native-wifi-reborn'
import { encryptData } from '../utils/aes'
import { useAuth } from '../providers/AuthProvider'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay'

type Props = NativeStackScreenProps<StackParamList>

export default function WifiScreen({ navigation }: Props) {
    // const { isConnected, type } = useNetInfo()
    const [ssid, setSsid] = useState('')
    const [password, setPassword] = useState('')
    const [ssidList, setSsidList] = useState<string[]>([])
    const [wifiList, setWifiList] = useState<WifiManager.WifiEntry[]>([])
    const [display, setDisplay] = useState<'ssid' | 'password'>('ssid')
    const [refreshList, setRefreshList] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [loading, setLoading] = useState(false)

    const { type, isConnected, details } = useNetInfo()

    const { authState } = useAuth()

    const loadWifiList = async () => {
        console.log('loading wifi list')
        setIsFetching(true)
        try {
            const list = await WifiManager.reScanAndLoadWifiList()
            setWifiList(list)
        } catch (error) {
            console.log(error)
        } finally {
            setIsFetching(false)
        }
    }

    const selectWifi = (ssid: string) => {
        console.log(ssid)
        setSsid(ssid)
        toggleDisplay('password')
    }

    const toggleDisplay = (display: string) => {
        setDisplay(display as 'ssid' | 'password')
    }

    const sendToDevice = async () => {
        setLoading(true)
        const test = {
            ssid,
            password,
            token: authState?.token || '',
        }

        console.log('send', test)

        const encrypted = await encryptData(JSON.stringify(test))

        const address = 'http://192.168.4.1'

        const config = {
            headers: {
                'Content-Type': 'text/plain', // Set the Content-Type header to text/plain
            },
            // timeout: 10,
        }

        try {
            const response = await axios.post(`${address}`, encrypted, config)
            console.log('response', response.data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
            navigation.navigate('Tabs')
        }
    }

    useEffect(() => {
        if (wifiList && Array.isArray(wifiList) && wifiList.length > 0) {
            const ssids = wifiList.map(item => item.SSID)
            setSsidList(ssids)
            console.log(ssids)
        }
    }, [wifiList])

    useEffect(() => {
        loadWifiList()
    }, [refreshList])

    useEffect(() => {
        if (type !== 'unknown' && !(type === 'wifi' && isConnected)) {
            setShowDialog(true)
        } else if (type === 'wifi' && isConnected) {
            setShowDialog(false)
            if (details?.ssid === 'sensor') {
                setShowDialog(false)
            }
        }
    }, [type, details])

    return (
        <View>
            <Portal>
                <Spinner visible={loading} textContent={'Ładowanie...'} />
                <Dialog
                    visible={showDialog}
                    onDismiss={() => {
                        setShowDialog(false)
                    }}>
                    <Dialog.Title>Połączenie z urządzeniem</Dialog.Title>
                    <Dialog.Content>
                        <Text variant='bodyMedium'>
                            Aby kontynuować konfigurację urządzenia, włącz WIFI
                            i połącz się z siecią urządzenia (sensor).
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => {
                                setShowDialog(false)
                            }}>
                            Ok
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Appbar.Header elevated={true} mode={'center-aligned'}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.navigate('Tabs')
                    }}
                />
                <Appbar.Content title='Wybierz sieć WiFi' />
            </Appbar.Header>
            <View style={{ padding: 16, rowGap: 24 }}>
                {display === 'ssid' ? (
                    wifiList.length > 0 ? (
                        <View style={{ rowGap: 16 }}>
                            <Text
                                style={{ textAlign: 'center' }}
                                variant={'titleLarge'}>
                                Wybierz sieć WiFi z listy
                            </Text>
                            <FlatList
                                data={ssidList}
                                contentContainerStyle={{ gap: 4 }}
                                renderItem={item => {
                                    return (
                                        <TouchableRipple
                                            style={{
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                                borderRadius: 8,
                                                padding: 16,
                                            }}
                                            onPress={() => {
                                                selectWifi(item.item)
                                            }}>
                                            <Text variant={'bodyMedium'}>
                                                {item.item}
                                            </Text>
                                        </TouchableRipple>
                                    )
                                }}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={isFetching}
                                        onRefresh={() =>
                                            setRefreshList(p => !p)
                                        }
                                    />
                                }
                            />
                            <Button
                                mode={'contained'}
                                onPress={() => setRefreshList(p => !p)}>
                                Odśwież listę
                            </Button>
                        </View>
                    ) : (
                        <Text variant={'titleLarge'}>
                            Ładowanie listy sieci...
                        </Text>
                    )
                ) : (
                    <></>
                )}
                {display === 'password' && (
                    <View style={{ rowGap: 4 }}>
                        <Text variant={'titleMedium'}>
                            Wybrana sieć: {ssid}
                        </Text>
                        <TextInput
                            label='Hasło'
                            value={password}
                            onChangeText={text => setPassword(text)}
                            mode={'outlined'}
                            outlineStyle={{ borderRadius: 8 }}
                            secureTextEntry={true}
                        />
                        <Button
                            mode={'contained'}
                            style={{ marginTop: 8 }}
                            onPress={sendToDevice}>
                            Dalej
                        </Button>
                        <Button
                            mode={'outlined'}
                            style={{ marginTop: 8 }}
                            onPress={() => toggleDisplay('ssid')}>
                            Wróć do listy sieci
                        </Button>
                    </View>
                )}
            </View>
        </View>
    )
}
