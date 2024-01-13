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
        elevation: {
            level0: 'transparent',
            // Note: Color values with transparency cause RN to transfer shadows to children nodes
            // instead of View component in Surface. Providing solid background fixes the issue.
            // Opaque color values generated with `palette.primary99` used as background
            level1: '#f4faff', // palette.primary40, alpha 0.05
            level2: '#edf7ff', // palette.primary40, alpha 0.08
            level3: '#e6f4ff', // palette.primary40, alpha 0.11
            level4: '#e4f3ff', // palette.primary40, alpha 0.12
            level5: '#e0f2ff', // palette.primary40, alpha 0.14
        },
    },
}
export default theme
