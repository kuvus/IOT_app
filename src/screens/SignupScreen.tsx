import { View } from 'react-native'
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'
import { useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import Spinner from 'react-native-loading-spinner-overlay'

type Props = NativeStackScreenProps<StackParamList>

export default function SignupScreen({}: Props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { onSignup } = useAuth()

    const handleSignup = async () => {
        setLoading(true)
        const result = await onSignup!(username, email, password)

        if (result) {
            setLoading(false)
            if (result.error) {
                if (result.message.response.status < 500) {
                    setError(result.message.response.data.detail)
                } else
                    setError('Wystąpił błąd serwera, spróbuj ponownie później')
            } else console.log(result.data)
        }

        console.log('b')
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
                label='Adres e-mail'
                value={email}
                onChangeText={text => setEmail(text)}
                mode={'outlined'}
                outlineStyle={{ borderRadius: 8 }}
                style={{ width: '100%' }}
                autoComplete={'email'}
                inputMode={'email'}
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
                onPress={() => handleSignup()}>
                Zarejestruj się
            </Button>
        </View>
    )
}
