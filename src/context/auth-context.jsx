import * as React from 'react'
import * as auth from '../auth-provider'
import client from '../utils/api-client'
import { useAsync } from '../utils/hooks'
import FullPageErrorFallback from '../screens/full-page-error-fallback'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
    const {
        data: user,
        status,
        error,
        // isLoading,
        // isIdle,
        isError,
        isSuccess,
        setData,
    } = useAsync()

    const login = React.useCallback(
        form => auth.login(form).then(user => setData(user)),
        [setData],
    )
    const logout = React.useCallback(() => {
        auth.logout()
        setData(null)
    }, [setData])

    const value = React.useMemo(
        () => ({ user, login, logout }),
        [login, logout, user],
    )

    // if (isLoading || isIdle) {
    //     return <FullPageLoading />
    // }

    if (isError) {
        return <FullPageErrorFallback error={error} />
    }

    if (isSuccess) {
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
