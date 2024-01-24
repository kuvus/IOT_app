import { View } from 'react-native'
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'
import { useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import Spinner from 'react-native-loading-spinner-overlay'

type Props = NativeStackScreenProps<StackParamList>
export default function LoginScreen({ navigation }: Props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { onLogin } = useAuth()

    const handleLogin = async () => {
        setLoading(true)
        const result = await onLogin!(username, password)

        if (result) {
            setLoading(false)
            if (result.error) {
                console.log('err', result.message)
                if (result.message.response.status < 500) {
                    console.log('c', result.message.response.data)
                    if (typeof result.message.response.data.detail === 'string')
                        setError(result.message.response.data.detail)
                    else setError(result.message.response.data.detail[0].msg)
                } else
                    setError('Wystąpił błąd serwera, spróbuj ponownie później')
            } else console.log(result.data)
        }
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
            }}>
            <Portal>
                <Dialog
                    visible={error != ''}
                    onDismiss={() => {
                        setError('')
                    }}>
                    <Dialog.Title>Wystąpił błąd</Dialog.Title>
                    <Dialog.Content>
                        <Text variant='bodyMedium'>{error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => {
                                setError('')
                            }}>
                            Ok
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Spinner visible={loading} textContent={'Ładowanie...'} />

            <TextInput
                label='Nazwa użytkownika'
                value={username}
                onChangeText={text => setUsername(text)}
                mode={'outlined'}
                outlineStyle={{ borderRadius: 8 }}
                style={{ width: '100%' }}
            />
            <TextInput
                label='Hasło'
                value={password}
                onChangeText={text => setPassword(text)}
                mode={'outlined'}
                outlineStyle={{ borderRadius: 8 }}
                secureTextEntry={true}
                style={{ width: '100%' }}
            />
            <Button
                mode={'contained'}
                style={{ marginTop: 8, width: '100%' }}
                onPress={() => handleLogin()}>
                Zaloguj się
            </Button>
        </View>
    )
}
