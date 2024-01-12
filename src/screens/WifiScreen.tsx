import { View, Text } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'

export default function WifiScreen() {
    // TODO: może być lista sieci, ale nie działa w expo go, może być po prostu wpisywanie nazwy i hasła
    const { isConnected, type } = useNetInfo()

    return (
        <View>
            <Text>Wybierz sieć, z którą będzie połączony czujnik</Text>
        </View>
    )
}
