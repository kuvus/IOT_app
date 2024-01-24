import {
    FlatList,
    RefreshControl,
    ScrollView,
    TouchableHighlight,
    View,
} from 'react-native'
import SensorListing from '../components/SensorListing'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Appbar, Text, TouchableRipple } from 'react-native-paper'
import { Sensor } from '../models/sensor.type'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'

import { mockData } from '../mock/Sensors'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosClient from '../utils/axios'
import { Device } from '../models/device.type'

type Props = NativeStackScreenProps<StackParamList>

export default function DevicesScreen({ navigation }: Props) {
    const [refreshing, setRefreshing] = useState(false)

    const { isLoading, data, isError, isFetching, refetch } = useQuery({
        queryKey: ['sensors'],
        queryFn: () => axiosClient.get<Device[]>('/users/devices'),
    })

    useEffect(() => {
        console.log('data', data?.data)
    }, [isLoading])

    const insets = useSafeAreaInsets()

    const viewStyle = {
        padding: 16,
        paddingBottom: insets.bottom + 198,
    }

    if (isLoading) {
        return (
            <View>
                <Header />
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
                <Header />
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
            <Header />
            {data?.data && data.data.length > 0 ? (
                <View style={viewStyle}>
                    <FlatList
                        data={data?.data}
                        renderItem={({ item }) => {
                            console.log(item)
                            // return <Text>{item.name}</Text>
                            return (
                                <TouchableRipple
                                    onPress={() =>
                                        navigation.navigate('Sensor', {
                                            device: item,
                                        })
                                    }>
                                    <SensorListing sensor={item} />
                                </TouchableRipple>
                            )
                        }}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={{
                            gap: 8,
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={refetch}
                            />
                        }
                    />
                </View>
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
                    <Text>Brak urządzeń.</Text>
                </ScrollView>
            )}
        </View>
    )
}

const Header = () => {
    return (
        <Appbar.Header elevated={true}>
            <Appbar.Content title='Lista urządzeń' />
            <Appbar.Action icon='magnify' onPress={() => {}} />
        </Appbar.Header>
    )
}
