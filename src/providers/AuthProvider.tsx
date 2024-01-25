import React, { createContext, useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import axios from '../utils/axios'
import * as SecureStore from 'expo-secure-store'
import config from '../../apiConfig.json'
import { checkIfTokenIsValid } from '../utils/jwt'
import axiosClean from 'axios'
import axiosClient from '../utils/axios'

type AuthState = {
    token: string | null
    refreshToken: string | null
    authenticated: boolean | null
}

interface AuthProps {
    authState?: AuthState
    onSignup?: (
        username: string,
        email: string,
        password: string
    ) => Promise<any>
    onLogin?: (username: string, password: string) => Promise<any>
    onLogout?: () => Promise<any>
    onRefreshToken?: () => Promise<any>
}

type LoginResponse = {
    access_token: string
    refresh_token: string
    token_type: string
}

type SignupResponse = {
    username: string
    email: string
}

const cleanClient = axiosClean.create({
    baseURL: config.apiUrl,
})

const ACC_TOKEN_KEY = config.accessTokenKey
const REF_TOKEN_KEY = config.refreshTokenKey

const AuthContext = createContext<AuthProps>({})
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        refreshToken: null,
        authenticated: null,
    })

    useEffect(() => {
        const loadTokens = async () => {
            const accessToken = await SecureStore.getItemAsync(ACC_TOKEN_KEY)
            const refreshToken = await SecureStore.getItemAsync(REF_TOKEN_KEY)
            if (accessToken && refreshToken) {
                setAuthState({
                    token: accessToken,
                    refreshToken: refreshToken,
                    authenticated: true,
                })
                // axios.defaults.headers.common['Authorization'] =
                //     `Bearer ${accessToken}`
            }
        }
        loadTokens()
    }, [])

    const onSignup = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            const response: AxiosResponse<SignupResponse> = await axios.post(
                `auth/signup`,
                {
                    username,
                    email,
                    password,
                }
            )
            console.log(response.data)
            return response
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }

    const onLogin = async (username: string, password: string) => {
        try {
            const response: AxiosResponse<LoginResponse> = await axios.postForm(
                `auth/login`,
                {
                    username,
                    password,
                }
            )
            console.log('data', response.data)
            await SecureStore.setItemAsync(
                ACC_TOKEN_KEY,
                response.data.access_token
            )
            await SecureStore.setItemAsync(
                REF_TOKEN_KEY,
                response.data.refresh_token
            )

            setAuthState({
                token: response.data.access_token,
                refreshToken: response.data.refresh_token,
                authenticated: true,
            })

            // axios.defaults.headers.common['Authorization'] =
            //     `Bearer ${response.data.access_token}`

            return response
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }

    const onRefreshToken = async () => {
        const refreshToken = await SecureStore.getItemAsync(REF_TOKEN_KEY)
        const response: AxiosResponse<LoginResponse> = await axios.post(
            `auth/token/refresh`,
            {
                refresh_token: refreshToken,
            }
        )
        await SecureStore.setItemAsync(
            ACC_TOKEN_KEY,
            response.data.access_token
        )
        await SecureStore.setItemAsync(
            REF_TOKEN_KEY,
            response.data.refresh_token
        )
        setAuthState({
            token: response.data.access_token,
            refreshToken: response.data.refresh_token,
            authenticated: true,
        })

        // axios.defaults.headers.common['Authorization'] =
        //     `Bearer ${response.data.access_token}`

        return response
    }

    const onLogout = async () => {
        try {
            await SecureStore.deleteItemAsync(ACC_TOKEN_KEY)
            await SecureStore.deleteItemAsync(REF_TOKEN_KEY)

            setAuthState({
                token: null,
                refreshToken: null,
                authenticated: false,
            })

            // axios.defaults.headers.common['Authorization'] = ''
        } catch (error) {
            console.log(error)
        }
    }

    axios.interceptors.request.use(async config => {
        if (authState.authenticated)
            try {
                const accessToken =
                    await SecureStore.getItemAsync(ACC_TOKEN_KEY)
                const refreshToken =
                    await SecureStore.getItemAsync(REF_TOKEN_KEY)

                if (accessToken) {
                    const valid = await checkIfTokenIsValid(accessToken)
                    if (!valid) {
                        if (refreshToken) {
                            console.log('refreshing token')
                            const data = await onRefreshToken()
                            if (data && data.data)
                                config.headers.Authorization = `Bearer ${data.data.access_token}`
                            else {
                                await onLogout()
                            }
                        } else {
                            await onLogout()
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
    })

    const value = {
        authState,
        onSignup,
        onLogin,
        onLogout,
        onRefreshToken,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
