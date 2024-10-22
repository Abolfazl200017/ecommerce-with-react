import FullPageSpinner from '../components/full-page-loading'
import { useAuth } from '../context/auth-context'
import * as React from "react"
import { readCard, addProduct } from '../test/data/basket'
import client from '../utils/api-client'

function Basket() {
    const { status, user } = useAuth()
    const [products, setProducts] = React.useState([])
    const card = (readCard())

    React.useEffect(() => {
        if (status === 'resolved' && !user) {
            console.log('redirect')
            window.location.href = '/'
        }
    }, [status, user])

    React.useEffect(() => {
        client('products').then((response) => {
            const list = response.filter((p) => card[p.id])
            setProducts(list.map((l) => {
                return { ...l, quantity: card[l.id].quantity }
            }))
        })
    }, [])

    if (status === 'idle' || status === 'pending' || !products.length)
        return <FullPageSpinner />

    return <div className='container mx-auto border rounded mt-5'>
        {JSON.stringify(products)}
    </div>
}

export default Basket