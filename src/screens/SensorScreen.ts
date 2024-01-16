import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native'

// type Props = NativeStackScreenProps<StackParamList, 'Sensor'>
type Props = RouteProp<StackParamList, 'Sensor'>

export default function ({ params }: Props) {
    params?.device
}
