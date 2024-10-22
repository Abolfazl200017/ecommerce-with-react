import FullPageSpinner from '../components/full-page-loading'
import { useAuth } from '../context/auth-context'
import * as React from "react"
import { readCard, addProduct, decreaseProductQuantity } from '../test/data/basket'
import client from '../utils/api-client'

// eslint-disable-next-line react/prop-types
function Quantity({ quantity, deleteProduct, id }) {
    const [state, setState] = React.useState(() => quantity)

    const increase = () => {
        setState(state + 1)
        addProduct({ id })
    }
    const decrease = () => {
        setState(state - 1)
        decreaseProductQuantity({ id })
    }
    const del = () => {
        deleteProduct(id)
        decreaseProductQuantity({ id })
    }

    return <div className='d-flex align-items-center'>
        {state > 1 ? <button onClick={decrease} className='rounded-circle bg-danger text-white overflow-hidden d-flex align-items-center justify-content-center' style={{ width: '30px', height: '30px', }}>
            -
        </button> : <button onClick={del} className='rounded-circle bg-danger text-white overflow-hidden d-flex align-items-center justify-content-center' style={{ width: '30px', height: '30px', }}>
            d
        </button>}

        <div className='px-3'>
            {state}
        </div>
        <button onClick={increase} className='rounded-circle bg-success text-white overflow-hidden d-flex align-items-center justify-content-center' style={{ width: '30px', height: '30px', }}>
            +
        </button>
    </div>
}

function Basket() {
    const { status, user } = useAuth()
    const [products, setProducts] = React.useState(null)
    const card = (readCard())

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id != id))
    }

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

    if (status === 'idle' || status === 'pending' || !products)
        return <FullPageSpinner />

    if (!products.length)
        return <h1>
            Your basket is empty
        </h1>

    return <div className='container mx-auto border rounded mt-5 p-3 pb-0'>
        {products.map((p, index) => (
            <div key={index} className='d-flex align-items-center justify-content-between mb-3'>
                <div className='d-flex align-items-center'>
                    <div className='overflow-hidden rounded-circle me-3 border' style={{ width: '50px', height: '50px' }}>
                        <img src={p.image} className='object-fit-contain w-100 h-100' />
                    </div>
                    <div className='me-3'>
                        {p.title}
                    </div>
                </div>
                <Quantity quantity={p.quantity} deleteProduct={deleteProduct} id={p.id} />
            </div>
        ))}
    </div>
}

export default Basket