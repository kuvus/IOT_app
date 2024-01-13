import { createContext, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'
import WelcomeScreen from './src/screens/WelcomeScreen'
import TabNavigator from './src/components/TabNavigator'
import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen'
import theme from './src/theme'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import ConnectScreen from './src/screens/ConnectScreen'
import WifiScreen from './src/screens/WifiScreen'
import { AuthProvider, useAuth } from './src/providers/AuthProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()

export type StackParamList = {
    Welcome: undefined
    Login: undefined
    Signup: undefined
    Tabs: undefined
    Wifi: undefined
}

const Navigation = () => {
    const { authState } = useAuth()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {authState?.authenticated ? (
                    <>
                        <Stack.Screen
                            name='Tabs'
                            component={TabNavigator}
                            options={{
                                headerBackVisible: false,
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='Connect'
                            component={ConnectScreen}
                            options={{
                                title: 'Połącz z urządzeniem',
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='Wifi'
                            component={WifiScreen}
                            options={{
                                title: 'Wybierz sieć WiFi',
                                headerShown: false,
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name='Welcome'
                            component={WelcomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Login'
                            component={LoginScreen}
                            options={{ title: 'Zaloguj się' }}
                        />
                        <Stack.Screen
                            name='Signup'
                            component={SignupScreen}
                            options={{ title: 'Zarejestruj się' }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function App() {
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <PaperProvider theme={theme}>
                    <Navigation />
                </PaperProvider>
            </SafeAreaProvider>
        </AuthProvider>
    )
}

export default App
