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

const Stack = createNativeStackNavigator()

export type StackParamList = {
    Welcome: undefined
    Login: undefined
    Signup: undefined
    Tabs: undefined
}

function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Welcome"
                        component={WelcomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ title: 'Zaloguj się' }}
                    />
                    <Stack.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{ title: 'Zarejestruj się' }}
                    />
                    <Stack.Screen
                        name="Connect"
                        component={ConnectScreen}
                        options={{ title: 'Połącz z urządzeniem' }}
                    />
                    <Stack.Screen name="Tabs" component={TabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App
