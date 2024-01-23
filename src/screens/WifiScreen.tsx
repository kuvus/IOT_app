import { View, FlatList } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import { Appbar, Button, List, TextInput, Text } from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'
import { useEffect, useState } from 'react'
import { useBluetoothConnection } from '../providers/BluetoothProvider'
import { Characteristic } from 'react-native-ble-plx'
import WifiManager from 'react-native-wifi-reborn'
import { encryptData } from '../utils/aes'
import { useAuth } from '../providers/AuthProvider'

type Props = NativeStackScreenProps<StackParamList>

export default function WifiScreen({ navigation }: Props) {
    // TODO: może być lista sieci, ale nie działa w expo go, może być po prostu wpisywanie nazwy i hasła
    // const { isConnected, type } = useNetInfo()
    const [ssid, setSsid] = useState('')
    const [password, setPassword] = useState('')
    const [ssidList, setSsidList] = useState<string[]>([])
    const [wifiList, setWifiList] = useState<WifiManager.WifiEntry[]>([])
    const [display, setDisplay] = useState<'ssid' | 'password'>('ssid')
    const [refreshList, setRefreshList] = useState(false)

    const { authState } = useAuth()

    const loadWifiList = async () => {
        console.log('loading wifi list')
        try {
            const list = await WifiManager.reScanAndLoadWifiList()
            setWifiList(list)
        } catch (error) {
            console.log(error)
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
        const test = {
            ssid,
            password,
            token: authState?.token || '',
        }

        const encrypted = await encryptData(JSON.stringify(test))

        //     TODO: wysłanie requestem do urządzenia
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

    return (
        <View>
            <Appbar.Header elevated={true} mode={'center-aligned'}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.navigate('Tabs')
                    }}
                />
                <Appbar.Content title='Wybierz sieć WiFi' />
            </Appbar.Header>
            <View style={{ padding: 16, rowGap: 24 }}>
                {display === 'ssid' && wifiList.length > 0 && (
                    <View style={{ rowGap: 16 }}>
                        <Text
                            style={{ textAlign: 'center' }}
                            variant={'titleLarge'}>
                            Wybierz sieć wifi z listy
                        </Text>
                        <FlatList
                            data={ssidList}
                            contentContainerStyle={{ gap: 4 }}
                            renderItem={item => {
                                return (
                                    <Text
                                        style={{
                                            borderStyle: 'solid',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            padding: 16,
                                        }}
                                        variant={'bodyMedium'}
                                        onPress={() => {
                                            selectWifi(item.item)
                                        }}>
                                        {item.item}
                                    </Text>
                                )
                            }}
                        />
                        <Button
                            mode={'contained'}
                            onPress={() => setRefreshList(p => !p)}>
                            Odśwież listę
                        </Button>
                    </View>
                )}
                {display === 'password' && (
                    <View style={{ rowGap: 4 }}>
                        {/*<TextInput*/}
                        {/*    label='SSID'*/}
                        {/*    value={ssid}*/}
                        {/*    onChangeText={text => setSsid(text)}*/}
                        {/*    mode={'outlined'}*/}
                        {/*    outlineStyle={{ borderRadius: 8 }}*/}
                        {/*/>*/}
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
                        <Button mode={'contained'} style={{ marginTop: 8 }}>
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
