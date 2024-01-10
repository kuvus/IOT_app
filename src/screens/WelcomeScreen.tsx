import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useAppTheme } from '../hooks/useAppTheme'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../../App'

type Props = NativeStackScreenProps<StackParamList>

export default function WelcomeScreen({ route, navigation }: Props) {
    const theme = useAppTheme()

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 16,
            }}>
            <Text
                style={{
                    fontSize: 25,
                    textAlign: 'center',
                    color: theme.colors.textLight,
                }}>
                Aby korzystać z aplikacji, musisz być zalogowany
            </Text>
            <View style={{ rowGap: 16 }}>
                <Button
                    onPress={() => navigation.navigate('Login')}
                    mode='contained'
                    buttonColor={theme.colors.background}
                    textColor={theme.colors.text}>
                    Zaloguj się
                </Button>
                <Button
                    onPress={() => navigation.navigate('Signup')}
                    mode='contained'
                    buttonColor={theme.colors.secondary}
                    textColor={theme.colors.surface}>
                    Zarejestruj się
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
