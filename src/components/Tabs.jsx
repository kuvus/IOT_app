import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import WelcomeScreen from '../screens/WelcomeScreen'
import SensorsScreen from '../screens/SensorsScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createMaterialBottomTabNavigator()

function Tabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: true }}>
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
                    headerShown: true,
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs
