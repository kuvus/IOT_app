import { createContext, useContext, useEffect, useReducer, useRef } from 'react'
import { BleManager, Device } from 'react-native-ble-plx'

type BluetoothConnectionContextProps = {
    /* definitions for all the methods/attributes to provide
     * e.g. startDeviceScanning, scannedDevices etc.
     */
    state: State
    dispatch: any
    scanAndConnect: () => void
    stopBLEScan: () => void
    connectToDevice: (device: Device) => Promise<boolean>
    disconnectFromDevice: (device: Device) => Promise<boolean>
    resetState: () => void
    manager: BleManager
}

type State = {
    isScanning: boolean
    scanDone: boolean
    bleReady: boolean
    items: Device[]
    connectedDevice?: Device | null
}

type Action = {
    type: string
    payload?: any
}

const BluetoothConnectionContext =
    createContext<BluetoothConnectionContextProps | null>(null)

let initialState = {
    isScanning: false,
    scanDone: false,
    bleReady: false,
    items: [],
    scanTimeout: 10000,
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'setBLEReady':
            return { ...state, bleReady: true }
        case 'setBLEOff':
            return { ...state, bleReady: false }
        case 'setBLEScan':
            return { ...state, isScanning: action.payload }
        case 'addItem':
            let items = state.items

            if (items.findIndex(x => x.id == action.payload.id) == -1) {
                items.push(action.payload)
            }

            return { ...state, items: items }
        case 'stopScan':
            return { ...state, isScanning: false, scanDone: true }
        case 'setConnectedDevice':
            return { ...state, connectedDevice: action.payload }
        case 'reset':
            return {
                ...state,
                items: [],
                bleReady: true,
                isScanning: false,
                scanDone: false,
                connectedDevice: null,
            }

        default:
            return state
    }
}
const manager = new BleManager()

export const BluetoothConnectionProvider: React.FC<{
    children: React.ReactElement | React.ReactElement[]
}> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        console.log('bt change')
        const subscription = manager.onStateChange(state => {
            if (state === 'PoweredOn') {
                dispatch({ type: 'setBLEReady' })
                subscription.remove()
            } else if (state === 'PoweredOff') {
                dispatch({ type: 'setBLEOff' })
            }
            //
        }, true)
        return () => subscription.remove()
    }, [manager])

    const stopBLEScan = () => {
        manager.stopDeviceScan()
        dispatch({ type: 'stopScan' })
    }

    const scanAndConnect = () => {
        try {
            manager.startDeviceScan(null, null, (error, device) => {
                dispatch({ type: 'setBLEScan', payload: true })
                if (error) {
                    console.error(error)
                    // Handle error (scanning will be stopped automatically)
                    return
                }

                // console.log(device?.id, device?.name)

                dispatch({ type: 'addItem', payload: device })
            })
        } catch (e) {
            console.log(e)
        }
    }

    const connectToDevice = async (device: Device) => {
        try {
            const res = await device.connect()
            console.log('Connected')
            dispatch({ type: 'setConnectedDevice', payload: device })
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    const disconnectFromDevice = async (device: Device) => {
        try {
            const res = await device.cancelConnection()
            console.log('Disconnected')
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    const resetState = () => {
        dispatch({ type: 'reset' })
    }

    const value = {
        state,
        dispatch,
        scanAndConnect,
        stopBLEScan,
        connectToDevice,
        disconnectFromDevice,
        resetState,
        manager,
    }

    return (
        <BluetoothConnectionContext.Provider value={value}>
            {children}
        </BluetoothConnectionContext.Provider>
    )
}

export const useBluetoothConnection = () => {
    const context = useContext(BluetoothConnectionContext)

    if (!context) {
        throw new Error(
            'useBluetoothConnection must be used with BluetoothConnectionProvider'
        )
    }

    return context
}
