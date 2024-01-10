import { StyleSheet, Text, ScrollView, View } from 'react-native'
import SensorListing from '../components/SensorListing'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Banner } from 'react-native-paper'
import { Sensor } from '../models/sensor.type'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'

type Props = NativeStackScreenProps<StackParamList>

const mockData: Sensor[] = [
    {
        id: 1,
        name: 'Sensor 1',
        status: true,
        temperature: 25.5,
        created_at: new Date('2024-01-10T08:00:00'),
        updated_at: new Date('2024-01-10T08:15:00'),
    },
    {
        id: 2,
        name: 'Sensor 2',
        status: false,
        temperature: 19.2,
        created_at: new Date('2024-01-10T08:30:00'),
        updated_at: new Date('2024-01-10T08:45:00'),
    },
    {
        id: 3,
        name: 'Sensor 3',
        status: true,
        temperature: 22.8,
        created_at: new Date('2024-01-10T09:00:00'),
        updated_at: new Date('2024-01-10T09:15:00'),
    },
    {
        id: 4,
        name: 'Sensor 4',
        status: true,
        temperature: 28.3,
        created_at: new Date('2024-01-10T09:30:00'),
        updated_at: new Date('2024-01-10T09:45:00'),
    },
    {
        id: 5,
        name: 'Sensor 5',
        status: false,
        temperature: 17.9,
        created_at: new Date('2024-01-10T10:00:00'),
        updated_at: new Date('2024-01-10T10:15:00'),
    },
    {
        id: 6,
        name: 'Sensor 6',
        status: true,
        temperature: 23.7,
        created_at: new Date('2024-01-10T10:30:00'),
        updated_at: new Date('2024-01-10T10:45:00'),
    },
    {
        id: 7,
        name: 'Sensor 7',
        status: false,
        temperature: 16.4,
        created_at: new Date('2024-01-10T11:00:00'),
        updated_at: new Date('2024-01-10T11:15:00'),
    },
    {
        id: 8,
        name: 'Sensor 8',
        status: true,
        temperature: 26.1,
        created_at: new Date('2024-01-10T11:30:00'),
        updated_at: new Date('2024-01-10T11:45:00'),
    },
    {
        id: 9,
        name: 'Sensor 9',
        status: true,
        temperature: 29.5,
        created_at: new Date('2024-01-10T12:00:00'),
        updated_at: new Date('2024-01-10T12:15:00'),
    },
    {
        id: 10,
        name: 'Sensor 10',
        status: false,
        temperature: 18.8,
        created_at: new Date('2024-01-10T12:30:00'),
        updated_at: new Date('2024-01-10T12:45:00'),
    },
]
export default function SensorsScreen({}: Props) {
    return (
        <SafeAreaView
            style={{
                marginHorizontal: 10,
            }}>
            <ScrollView style={{}} contentContainerStyle={{ rowGap: 8 }}>
                {mockData.map(sensor => (
                    <SensorListing sensor={sensor} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
