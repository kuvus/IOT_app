import { View, StyleSheet } from 'react-native'

import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Appbar, Button, Dialog, Portal, Text } from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NativeStackScreenProps<StackParamList>

export default function ConnectScreen({ navigation }: Props) {
    const { type, isConnected, details } = useNetInfo()
    //
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        if (type !== 'unknown' && !(type === 'wifi' && isConnected)) {
            setShowDialog(true)
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
                            Nazwa sieci: czujnik1
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            Po połączeniu przejdź do kolejnego kroku.
                        </Text>
                    </View>
                </View>
                <Button
                    onPress={() => navigation.navigate('Wifi')}
                    mode='contained'>
                    Dalej
                </Button>
            </View>
        </View>
    )
}
