import {
    View,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    FlatList,
} from 'react-native'

import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Appbar, Button, Dialog, List, Portal, Text } from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BleManager } from 'react-native-ble-plx'
import { useBluetoothConnection } from '../providers/BluetoothProvider'
import Aes from 'react-native-aes-crypto'
import { encryptData } from '../utils/aes'

type Props = NativeStackScreenProps<StackParamList>

// const ble = new BleManager()

export default function ConnectScreen({ navigation }: Props) {
    const { type, isConnected, details } = useNetInfo()
    const [noDevice, setNoDevice] = useState(false)
    const [connected, setConnected] = useState(true) // TODO: zmienić na false

    //
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        console.log(type, details)
        if (type !== 'unknown' && !(type === 'wifi' && isConnected)) {
            setShowDialog(true)
        } else if (type === 'wifi' && isConnected) {
            setShowDialog(false)
            if (details?.ssid === 'sensor') {
                setConnected(true)
            }
        }
    }, [type, details])

    return (
        <View style={{ flex: 1 }}>
            <Portal>
                <Dialog
                    visible={showDialog}
                    onDismiss={() => {
                        setShowDialog(false)
                    }}>
                    <Dialog.Title>Połączenie z urządzeniem</Dialog.Title>
                    <Dialog.Content>
                        <Text variant='bodyMedium'>
                            Aby kontynuować konfigurację urządzenia, włącz WIFI
                            i połącz się z siecią urządzenia.
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
                <Appbar.Content title='Dodaj czujnik' />
            </Appbar.Header>
            <View
                style={{
                    padding: 16,
                    rowGap: 8,
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    flex: 1,
                }}>
                <View style={{ gap: 32 }}>
                    <Text
                        style={{ textAlign: 'center' }}
                        variant={'titleLarge'}>
                        Połącz się z siecią urządzenia, aby rozpocząć
                        konfigurację.
                    </Text>
                    <View>
                        <Text
                            style={{ textAlign: 'center' }}
                            variant={'titleMedium'}>
                            Nazwa sieci: sensor
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            Po połączeniu przejdź do kolejnego kroku.
                        </Text>
                    </View>
                </View>
                <Button
                    onPress={() => navigation.navigate('Wifi')}
                    mode='contained'
                    disabled={!connected}>
                    Dalej
                </Button>

                {/*<FlatList*/}
                {/*    data={state.items}*/}
                {/*    renderItem={item => {*/}
                {/*        return (*/}
                {/*            <List.Item*/}
                {/*                title={item.item.name}*/}
                {/*                description={item.item.id}*/}
                {/*            />*/}
                {/*        )*/}
                {/*    }}*/}
                {/*/>*/}
                {/*{state.isScanning ? (*/}
                {/*    <View>*/}
                {/*        <Text*/}
                {/*            variant={'titleLarge'}*/}
                {/*            style={{ textAlign: 'center' }}>*/}
                {/*            Wyszukiwanie czujnika...*/}
                {/*        </Text>*/}
                {/*        <Text style={{ textAlign: 'center' }}>*/}
                {/*            Upewnij się, że czujnik jest włączony i znajduje się*/}
                {/*            w zasięgu bluetooth.*/}
                {/*        </Text>*/}
                {/*    </View>*/}
                {/*) : (*/}
                {/*    <View>*/}
                {/*        <Text*/}
                {/*            variant={'titleLarge'}*/}
                {/*            style={{ textAlign: 'center' }}>*/}
                {/*            Nie znaleziono czujnika*/}
                {/*        </Text>*/}
                {/*        <Text style={{ textAlign: 'center' }}>*/}
                {/*            Upewnij się, że czujnik jest włączony i znajduje się*/}
                {/*            w zasięgu bluetooth.*/}
                {/*        </Text>*/}
                {/*        <Button*/}
                {/*            onPress={() => {*/}
                {/*                rescan()*/}
                {/*            }}*/}
                {/*            mode='contained'>*/}
                {/*            Przeskanuj ponownie*/}
                {/*        </Button>*/}
                {/*    </View>*/}
                {/*)}*/}
            </View>
        </View>
    )
}
