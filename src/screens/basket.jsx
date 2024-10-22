import FullPageSpinner from '../components/full-page-loading'
import { useAuth } from '../context/auth-context'
import * as React from "react"

function Basket() {
    const { status, user } = useAuth()

    React.useEffect(() => {
        if (status === 'resolved' && !user) {
            console.log('redirect')
            window.location.href = '/'
        }
    }, [status, user])

    if (status === 'idle' || status === 'pending')
        return <FullPageSpinner />

    return <div>
        basket
    </div>
}

export default Basket