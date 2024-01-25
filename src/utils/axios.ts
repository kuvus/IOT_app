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

export default axiosClient
