import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import WelcomeScreen from '../screens/WelcomeScreen'
import SensorsScreen from '../screens/SensorsScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ConnectScreen from '../screens/ConnectScreen'

const Tab = createMaterialBottomTabNavigator()

function Tabs() {
    return (
        <Tab.Navigator
            barStyle={{
                backgroundColor: '#f3f8ff',
            }}>
            <Tab.Screen
                name='Sensors'
                component={SensorsScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name='access-point'
                            color={color}
                            size={26}
                        />
                    ),
                    title: 'Czujniki',
                }}
            />
            <Tab.Screen
                name={'Dodaj czujnik'}
                component={ConnectScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name='plus'
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs
