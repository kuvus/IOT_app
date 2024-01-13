import { View, Text } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import { Appbar, Button, TextInput } from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'
import { useState } from 'react'

type Props = NativeStackScreenProps<StackParamList>

export default function WifiScreen({ navigation }: Props) {
    // TODO: może być lista sieci, ale nie działa w expo go, może być po prostu wpisywanie nazwy i hasła
    // const { isConnected, type } = useNetInfo()
    const [ssid, setSsid] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View>
            <Appbar.Header elevated={true} mode={'center-aligned'}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.navigate('Tabs')
                    }}
                />
                <Appbar.Content title='Wybierz sieć WiFi' />
            </Appbar.Header>
            <View style={{ padding: 16, rowGap: 24 }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>
                    Podaj dane sieci, z którą będzie się łączył czujnik.
                </Text>
                <View style={{ rowGap: 4 }}>
                    <TextInput
                        label='SSID'
                        value={ssid}
                        onChangeText={text => setSsid(text)}
                        mode={'outlined'}
                        outlineStyle={{ borderRadius: 8 }}
                    />
                    <TextInput
                        label='Hasło'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        mode={'outlined'}
                        outlineStyle={{ borderRadius: 8 }}
                        secureTextEntry={true}
                    />
                    <Button mode={'contained'} style={{ marginTop: 8 }}>
                        Dalej
                    </Button>
                </View>
            </View>
        </View>
    )
}
