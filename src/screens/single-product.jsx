import { useParams } from 'react-router-dom';
import * as React from "react";
import client from '../utils/api-client';
import FullPageSpinner from '../components/full-page-loading';
import star from '../assets/images/star.png'
import { Button, Spinner } from 'reactstrap';
import { useAuth } from '../context/auth-context';
import { readCard, addProduct, decreaseProductQuantity } from '../test/data/basket'

function SingleProduct() {
    const { id } = useParams();
    const [product, setProduct] = React.useState(null)
    const { user, status } = useAuth()
    const card = readCard()
    const [numberInCard, setNumberInCard] = React.useState(() => card[id] ? card[id].quantity : 0)

    const addToCard = React.useCallback(() => {
        setNumberInCard(numberInCard + 1)
        addProduct({ id: id })
    }, [id, numberInCard])

    const decreaseNumberInCard = React.useCallback(() => {
        setNumberInCard(numberInCard - 1)
        decreaseProductQuantity({ id: id })
    }, [id, numberInCard])

    React.useEffect(() => {
        client(`products/${id}`).then(setProduct)
    }, [id])

    if (!product)
        return <FullPageSpinner />

    return <>
        <div className='contanier-lg mt-5 p-5' style={{ maxWidth: '100vw' }}>
            <div className='row w-100'>
                <div className='col-12 col-md-4 p-0'>
                    <img src={product.image} className='w-100 object-fit-contain border rounded' />
                </div>
                <div className='mt-5 mt-md-0 col-12 col-md-8 ps-md-4 border-md-start'>
                    <div className='w-full h-md-100'>
                        <h1>
                            {product.title}
                        </h1>
                        <h5>
                            {product.description}
                        </h5>
                        <div className='mt-5 text-secondary text-sm'>
                            <div className='d-flex px-3'>
                                <img style={{ width: '25px', height: '25px' }} src={star} />
                                <span className='ms-1 me-3'>
                                    {product.rating.rate}
                                </span>
                                <span>
                                    {product.rating.count}
                                </span>
                            </div>
                        </div>
                        {status === 'idle' || status === 'pending' ? <Spinner /> : !user ? '' : numberInCard > 0 ? <div className='d-flex align-items-center w-100 justify-content-center'>
                            <Button onClick={decreaseNumberInCard} className='text-danger bg-white fw-bold fs-lg p-0 rounded-circle btn-outline-danger' style={{ width: '30px', height: '30px' }}>-</Button>
                            <div className='px-3 user-select-none'>{numberInCard}</div>
                            <Button onClick={addToCard} className='text-success bg-white fw-bold fs-lg p-0 rounded-circle btn-outline-success' style={{ width: '30px', height: '30px' }}>+</Button>
                        </div> : <Button onClick={addToCard} color='primary' className='mt-3' >Add to basket</Button>}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SingleProduct;