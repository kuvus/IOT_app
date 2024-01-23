import Aes from 'react-native-aes-crypto'
import config from '../../apiConfig.json'

const stringToHex = (str: string) => {
    let hex = ''
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i)
        const hexValue = charCode.toString(16)

        // Pad with zeros to ensure two-digit representation
        hex += hexValue.padStart(2, '0')
    }
    return hex
}
export const encryptData = async (text: string) => {
    const keyHex = stringToHex(config.aes_key)
    // return Aes.randomKey(16).then(iv => {
    const iv = stringToHex(config.aes_iv)
    return await Aes.encrypt(text, keyHex, iv, 'aes-256-cbc')
}
