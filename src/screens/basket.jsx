import FullPageSpinner from '../components/full-page-loading'
import { useAuth } from '../context/auth-context'
import * as React from "react"
import { readCard, addProduct, decreaseProductQuantity, reset } from '../test/data/basket'
import client from '../utils/api-client'
import { Alert, Button, Spinner } from 'reactstrap'
import { jwtDecode } from 'jwt-decode'

// eslint-disable-next-line react/prop-types
function Quantity({ quantity, increaseProduct, decreaseProduct, deleteProduct, id }) {
    const [state, setState] = React.useState(() => quantity)

    const increase = () => {
        increaseProduct(id)
        setState(state + 1)
        addProduct({ id })
    }
    const decrease = () => {
        decreaseProduct(id)
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

function getTodayDateYYYYMMDD() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Convert to 1-12 range
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Basket() {
    const { status, user } = useAuth()
    const [products, setProducts] = React.useState(null)
    const card = (readCard())
    const [message, setMessage] = React.useState(null)
    const [submitStatus, setSubmitStatus] = React.useState('idle')

    const submit = () => {
        setSubmitStatus('pending')

        const userId = jwtDecode(user.token).sub
        const date = getTodayDateYYYYMMDD()
        const products = Object.values(readCard()).map((c) => {
            return { productId: c.id, quantity: c.quantity }
        })

        client('carts', {
            data: {
                userId,
                date,
                products,
            }
        }).then(() => {
            setSubmitStatus('resolved')
            setProducts([])
            reset()
            setMessage('success')
            setTimeout(() => {
                setMessage(null)
            }, 5000);
        })
    }

    const increaseProduct = (id) => {
        setProducts(products.map(p => {
            if (p.id === id)
                return { ...p, quantity: p.quantity + 1 }
            return p
        }))
    }

    const decreaseProduct = (id) => {
        setProducts(products.map(p => {
            if (p.id === id)
                return { ...p, quantity: p.quantity - 1 }
            return p
        }))
    }

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id != id))
    }

    React.useEffect(() => {
        if (status === 'resolved' && !user) {
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
    }, [card])

    if (status === 'idle' || status === 'pending' || !products)
        return <FullPageSpinner />

    if (!products.length)
        return <>
            <Alert isOpen={message === 'success'} className='position-fixed z-10' style={{ bottom: '30px' }} >
                {`Your cart added successfully :)`}
            </Alert>
            <h1>
                Your basket is empty
            </h1>
        </>

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
                <div className='d-flex align-items-center'>
                    <div className='user-select-none me-3'>{p.quantity * p.price}</div>
                    <Quantity quantity={p.quantity} increaseProduct={increaseProduct} decreaseProduct={decreaseProduct} deleteProduct={deleteProduct} id={p.id} />
                </div>
            </div>
        ))}

        <div className='d-flex border-top w-100 my-3 pt-3'>
            <div className='user-select-none d-flex align-items-center'>
                <div className='me-3'>
                    Total price: {products.map((p) => p.price * p.quantity).reduce((partialSum, a) => partialSum + a, 0)}
                </div>
                <div>
                    Number of items: {products.map((p) => p.quantity).reduce((partialSum, a) => partialSum + a, 0)}
                </div>
            </div>
        </div>

        {submitStatus === 'pending' ? <Spinner color='primary' className='mb-3' /> : <Button onClick={submit} color='primary mb-3'>
            submit order
        </Button>}

    </div>
}

export default Basket