import { View } from 'react-native'
import { Appbar, Text } from 'react-native-paper'
import { useAuth } from '../providers/AuthProvider'

export default function ProfileScreen() {
    const { onLogout } = useAuth()

    return (
        <View>
            <Appbar.Header elevated={true}>
                <Appbar.Content title='Profil' />
                <Appbar.Action
                    icon='logout'
                    onPress={() => {
                        onLogout!()
                    }}
                />
            </Appbar.Header>
            <View style={{ padding: 16 }}>
                <Text>Profil</Text>
            </View>
        </View>
    )
}
