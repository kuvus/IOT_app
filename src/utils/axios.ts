import config from '../../apiConfig.json'

import axios from 'axios'
import { AuthProvider } from '../providers/AuthProvider'
import * as SecureStore from 'expo-secure-store'
import { checkIfTokenIsValid } from './jwt'

const ACC_TOKEN_KEY = config.accessTokenKey
const REF_TOKEN_KEY = config.refreshTokenKey

const cleanClient = axios.create({
    baseURL: config.apiUrl,
})

const axiosClient = axios.create({
    baseURL: config.apiUrl,
})

// axiosClient.interceptors.request.use(request => {
//     console.log('Starting Request', JSON.stringify(request, null, 2))
//     return request
// })
//
// axiosClient.interceptors.response.use(response => {
//     console.log('Response:', JSON.stringify(response, null, 2))
//     return response
// })

axiosClient.interceptors.request.use(async config => {
    // const token = axios.defaults.headers.common['Authorization']
    //
    // console.log('token', token)

    try {
        const accessToken = await SecureStore.getItemAsync(ACC_TOKEN_KEY)
        const refreshToken = await SecureStore.getItemAsync(REF_TOKEN_KEY)

        if (accessToken) {
            const valid = await checkIfTokenIsValid(accessToken)
            if (!valid) {
                if (refreshToken) {
                    console.log('refreshing token')
                    const { data } = await cleanClient.post('/auth/refresh', {
                        refreshToken,
                    })
                    console.log(data)
                    await SecureStore.setItemAsync(
                        ACC_TOKEN_KEY,
                        data.accessToken
                    )
                    await SecureStore.setItemAsync(
                        REF_TOKEN_KEY,
                        data.refreshToken
                    )
                    config.headers.Authorization = `Bearer ${data.accessToken}`
                } else {
                    await SecureStore.deleteItemAsync(ACC_TOKEN_KEY)
                    await SecureStore.deleteItemAsync(REF_TOKEN_KEY)
                }
            } else {
                config.headers.Authorization = accessToken
                    ? `Bearer ${accessToken}`
                    : ''
            }
        }
    } catch (e) {
        console.log(e)
    }

    return config
    // console.log('tokens', accessToken, refreshToken)
})

export default axiosClient
