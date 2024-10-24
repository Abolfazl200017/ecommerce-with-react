import * as React from 'react'
import * as auth from '../auth-provider'
import client from '../utils/api-client'
import { useAsync } from '../utils/hooks'
import FullPageErrorFallback from '../screens/full-page-error-fallback'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

async function bootstrapAppData() {
    const user = await auth.initalUserWithTokenInLocalStorage()
    return user ? user : null
}

function AuthProvider(props) {
    const {
        data: user,
        status,
        error,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        setData,
        run,
        safeSetState,
    } = useAsync()

    React.useEffect(() => {
        const appDataPromise = bootstrapAppData()
        run(appDataPromise)
    }, [run])

    const login = React.useCallback(
        form => {
            safeSetState({ status: 'pending' })

            return auth.login(form).then(user => {
                console.log('response', user)
                setData(user)
            }, (error) => {
                console.log('error is ', error)
                setData(null)
            })
        },
        [safeSetState, setData],
    )
    const logout = React.useCallback(() => {
        auth.logout()
        setData(null)
    }, [setData])

    const value = React.useMemo(
        () => ({ user, login, logout, status }),
        [login, logout, user, status],
    )

    // if (isLoading || isIdle) {
    //     return <FullPageLoading />
    // }

    if (isError) {
        return <FullPageErrorFallback error={error} />
    }

    if (isSuccess || isLoading || isIdle) {
        return <AuthContext.Provider value={value} {...props} />
    }

    throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}

function useClient() {
    const { user } = useAuth()
    const token = user?.token
    return React.useCallback(
        (endpoint, config) => client(endpoint, { ...config, token }),
        [token],
    )
}

export { AuthProvider, useAuth, useClient }
