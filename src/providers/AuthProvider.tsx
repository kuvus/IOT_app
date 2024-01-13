import React, { createContext, useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import axios from '../utils/axios'
import * as SecureStore from 'expo-secure-store'
import config from '../../apiConfig.json'

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

            axios.defaults.headers.common['Authorization'] =
                `Bearer ${response.data.access_token}`

            return response
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }

    const onRefreshToken = async () => {
        try {
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

            return response
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
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

            axios.defaults.headers.common['Authorization'] = ''
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        authState,
        onSignup,
        onLogin,
        onLogout,
        onRefreshToken,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
