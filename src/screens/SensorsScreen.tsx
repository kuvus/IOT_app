import { FlatList, RefreshControl, View } from 'react-native'
import SensorListing from '../components/SensorListing'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Appbar, Text } from 'react-native-paper'
import { Sensor } from '../models/sensor.type'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'

import { mockData } from '../mock/Sensors'
import { useCallback, useState } from 'react'

type Props = NativeStackScreenProps<StackParamList>

export default function SensorsScreen({}: Props) {
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        // TODO: fetch data from API
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [])

    const insets = useSafeAreaInsets()

    return (
        <View>
            <Appbar.Header elevated={true}>
                <Appbar.Content title='Lista czujników' />
                <Appbar.Action icon='magnify' onPress={() => {}} />
            </Appbar.Header>
            <View
                style={{
                    padding: 16,
                    paddingBottom: insets.bottom + 198,
                }}>
                <FlatList
                    data={mockData}
                    renderItem={({ item }) => <SensorListing sensor={item} />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{
                        gap: 8,
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </View>
    )
}
