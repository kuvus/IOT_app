import WaitScreen from './src/screens/WaitScreen'

global.Buffer = require('buffer').Buffer
import { createContext, useContext, useEffect } from 'react'
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
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Device } from './src/models/device.type'
import SensorScreen from './src/screens/SensorScreen'
import { PermissionsAndroid, Platform, StatusBar } from 'react-native'
import type { StatusBarStyle } from 'react-native'

const queryClient = new QueryClient()

export type StackParamList = {
    Welcome: undefined
    Login: undefined
    Signup: undefined
    Tabs: undefined
    Wifi: undefined
    Connect: undefined
    Devices: undefined
    Sensor: { device: Device } | undefined
    Wait: { device: Device } | undefined
}

const Stack = createNativeStackNavigator<StackParamList>()

const Navigation = () => {
    const { authState } = useAuth()

    useEffect(() => {
        // BleManager.enableBluetooth().then(() => {
        //     console.log('Bluetooth is turned on!')
        // })

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(result => {
                if (result) {
                    console.log('Permission is OK')
                } else {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    ).then(result => {
                        if (result) {
                            console.log('User accept')
                        } else {
                            console.log('User refuse')
                        }
                    })
                }
            })

            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES
            ).then(result => {
                if (result) {
                    console.log('Permission is OK')
                } else {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES
                    ).then(result => {
                        if (result) {
                            console.log('User accept')
                        } else {
                            console.log('User refuse')
                        }
                    })
                }
            })
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
            ).then(result => {
                if (result) {
                    console.log('Permission is OK')
                } else {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
                    ).then(result => {
                        if (result) {
                            console.log('User accept')
                        } else {
                            console.log('User refuse')
                        }
                    })
                }
            })
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
            ).then(result => {
                if (result) {
                    console.log('Permission is OK')
                } else {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
                    ).then(result => {
                        if (result) {
                            console.log('User accept')
                        } else {
                            console.log('User refuse')
                        }
                    })
                }
            })
        }
    }, [])

    return (
        <NavigationContainer>
            <StatusBar barStyle='dark-content' />
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
                        <Stack.Screen
                            name='Sensor'
                            component={SensorScreen}
                            options={{
                                title: 'Wybierz sieć WiFi',
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='Wait'
                            component={WaitScreen}
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
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    <PaperProvider theme={theme}>
                        <Navigation />
                    </PaperProvider>
                </SafeAreaProvider>
            </QueryClientProvider>
        </AuthProvider>
    )
}

export default App
