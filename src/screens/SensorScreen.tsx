import { StackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native'
import { Device } from '../models/device.type'
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import axiosClient from '../utils/axios'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Measurement } from '../models/measurement.type'

type Props = NativeStackScreenProps<StackParamList, 'Sensor'>

export default function SensorScreen({ route }: Props) {
    if (!route.params?.device)
        return (
            <View>
                <Text>Brak danych urządzenia</Text>
            </View>
        )

    const device: Device = route.params?.device

    const { isLoading, data, isError, isFetching, refetch } = useQuery({
        queryKey: ['sensor', device.id],
        queryFn: () =>
            axiosClient.get<Measurement>(`/measurements/${device.id}`),
    })

    const insets = useSafeAreaInsets()

    const viewStyle = {
        padding: 16,
        paddingBottom: insets.bottom + 198,
    }

    if (isLoading) {
        return (
            <View>
                <ScrollView
                    style={{
                        ...viewStyle,
                        height: '100%',
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={() => {}}
                        />
                    }>
                    <Text>Ładowanie...</Text>
                </ScrollView>
            </View>
        )
    }

    if (isError) {
        return (
            <View>
                <ScrollView
                    style={{
                        ...viewStyle,
                        height: '100%',
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={refetch}
                        />
                    }>
                    <Text>Wystąpił błąd podczas pobierania urządzeń.</Text>
                </ScrollView>
            </View>
        )
    }

    return (
        <View>
            {data?.data ? (
                <ScrollView
                    style={{
                        ...viewStyle,
                        height: '100%',
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={refetch}
                        />
                    }>
                    <Text>{data?.data.temperature}</Text>
                    <Text>{data?.data.time_created}</Text>
                </ScrollView>
            ) : (
                <ScrollView
                    style={{
                        ...viewStyle,
                        height: '100%',
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={refetch}
                        />
                    }>
                    <Text>Brak danych.</Text>
                </ScrollView>
            )}
        </View>
    )
}
