import { View, Text } from 'react-native'
import { Sensor } from '../models/sensor.type'

export default function SensorListing({ sensor }: { sensor: Sensor }) {
    return (
        <View style={{ borderWidth: 1, borderRadius: 5, padding: 5 }}>
            <Text>{sensor.name}</Text>
            <Text>{sensor.temperature} C</Text>
        </View>
    )
}
