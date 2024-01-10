import { MD3LightTheme } from 'react-native-paper'

const theme = {
    ...MD3LightTheme,
    roundness: 1,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#24A3FF',
        accent: '#FFC107',
        secondary: '#212121',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        error: '#B00020',
        text: '#000000',
        textLight: '#FFFFFF',
        onBackground: '#000000',
        onSurface: '#000000',
        disabled: '#000000',
        placeholder: '#000000',
        backdrop: '#000000',
        notification: '#000000',
    },
}
export default theme
