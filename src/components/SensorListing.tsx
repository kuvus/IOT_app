import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Sensor } from '../models/sensor.type'
import { Device } from '../models/device.type'

export default function SensorListing({ sensor }: { sensor: Device }) {
    return (
        <View style={{ borderWidth: 1, borderRadius: 5, padding: 8 }}>
            <Text variant={'labelLarge'}>
                Nazwa: <Text>{sensor.name}</Text>
            </Text>
            <Text variant={'labelLarge'}>
                ID: <Text>{sensor.id}</Text>
            </Text>
        </View>
    )
}
