// import { decode } from 'react-native-pure-jwt'

const parseJwt = (token: string) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export const checkIfTokenIsValid = async (token: string) => {
    const decodedToken = parseJwt(token)

    if (decodedToken) {
        const now = Date.now().valueOf() / 1000
        if (
            typeof decodedToken === 'object' &&
            decodedToken.hasOwnProperty('exp') &&
            decodedToken.exp
        ) {
            return decodedToken?.exp > now
        }
    }
    return false
}
