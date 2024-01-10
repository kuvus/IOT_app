import theme from '../theme'
import { useTheme } from 'react-native-paper'

export type AppTheme = typeof theme
export const useAppTheme = () => useTheme<AppTheme>()
