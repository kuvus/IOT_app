import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useQuery } from '@tanstack/react-query'
import axiosClient from '../utils/axios'
import { Device } from '../models/device.type'
import { useEffect } from 'react'

type Props = NativeStackScreenProps<StackParamList, 'Wait'>

export default function WaitScreen({ route }: Props) {
    // query get devices from user

    const { isLoading, data, isError, isFetching, refetch } = useQuery({
        queryKey: ['sensors'],
        queryFn: () => axiosClient.get<Device[]>('/users/devices'),
        refetchInterval: 5000,
    })

    useEffect(() => {
        console.log('data', data?.data)
    }, [data])

    return (
        <View>
            <Text variant={'titleLarge'} style={{ textAlign: 'center' }}>
                Oczekiwanie na dodanie urządzenia...
            </Text>
        </View>
    )
}
