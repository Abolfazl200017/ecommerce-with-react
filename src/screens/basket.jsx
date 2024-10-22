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

    return <div className='container mx-auto border rounded mt-5 p-3'>
        {products.map((p, index) => (
            <div key={index} className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                    <div className='overflow-hidden rounded-circle me-3 border' style={{ width: '50px', height: '50px' }}>
                        <img src={p.image} className='object-fit-contain w-100 h-100' />
                    </div>
                    <div className='me-3'>
                        {p.title}
                    </div>
                </div>
                <div>
                    {p.quantity}
                </div>
            </div>
        ))}
    </div>
}

export default Basket