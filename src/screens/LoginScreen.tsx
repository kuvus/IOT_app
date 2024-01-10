import { View } from 'react-native'
import { Button } from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'

type Props = NativeStackScreenProps<StackParamList>
export default function LoginScreen({ navigation }: Props) {
    return (
        <View>
            <Button
                onPress={() => navigation.navigate('Tabs')}
                mode='contained'>
                Przejdź do sensorów
            </Button>
        </View>
    )
}
