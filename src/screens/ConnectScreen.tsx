import { View, Text } from 'react-native'

import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'

export default function ConnectScreen() {
    const { type, isConnected, details } = useNetInfo()

    const [ssid, setSsid] = useState('Brak')

    useEffect(() => {
        if (type === 'wifi' && isConnected) {
            setSsid(details?.ssid ?? 'Brak')
        }
    }, [type, details])

    return (
        <View>
            <Text>
                Połącz się z siecią urządzenia, aby rozpocząć konfigurację.
            </Text>
            <Text>Nazwa sieci: czujnik1</Text>
            <Text>Po połączeniu przejdź do kolejnego kroku.</Text>
            <Text>Nazwa sieci: {ssid}</Text>
        </View>
    )
}
