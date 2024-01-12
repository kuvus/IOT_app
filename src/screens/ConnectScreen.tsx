import { View } from 'react-native'

import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
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
        <SafeAreaView
            style={{
                padding: 16,
                rowGap: 8,
            }}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
                Połącz się z siecią urządzenia, aby rozpocząć konfigurację.
            </Text>
            <View style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 18 }}>Nazwa sieci: czujnik1</Text>
                <Text>Po połączeniu przejdź do kolejnego kroku.</Text>
            </View>
            <Button
                onPress={() => navigation.navigate('Wifi')}
                mode='contained'>
                Dalej
            </Button>

            <Portal>
                <Dialog
                    visible={showDialog}
                    onDismiss={() => {
                        setShowDialog(false)
                    }}>
                    <Dialog.Title>Połączenie z czujnikiem</Dialog.Title>
                    <Dialog.Content>
                        <Text variant='bodyMedium'>
                            Aby kontynuować konfigurację czujnika, włącz WIFI i
                            połącz się z siecią czujnika.
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
        </SafeAreaView>
    )
}
