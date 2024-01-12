import { MD3LightTheme } from 'react-native-paper'

const theme = {
    ...MD3LightTheme,
    roundness: 1,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#24A3FF',
        primaryContainer: '#FFFFFF',
        onPrimary: '#ffffff',
        accent: '#FFC107',
        secondary: '#212121',
        secondaryContainer: '#c8e5ff',
        surface: '#FFFFFF',
        error: '#B00020',
        text: '#000000',
        textLight: '#FFFFFF',
    },
}
export default theme
