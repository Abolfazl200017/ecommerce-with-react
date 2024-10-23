import { Card, CardBody, CardTitle, Button, Spinner } from 'reactstrap'
import PropTypes from 'prop-types';
import star from '../assets/images/star.png'
import add from '../assets/images/add-to-cart.png'
import { useAuth } from '../context/auth-context';
import { readCard, addProduct } from '../test/data/basket'
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'

function ProductCard({ jewelery, customStyle }) {
    const { title, image, rating } = jewelery
    const { color, isList } = customStyle
    const { user, status } = useAuth()
    const card = readCard()
    const [isExist, setIsExist] = React.useState(() => Boolean(card[jewelery.id]))
    const addToCard = React.useCallback(() => {
        setIsExist(true)
        addProduct({ id: jewelery.id })
    }, [])

    return <Card
        style={{
            width: '100%',
            height: isList ? '100%' : 'auto',
            color: color,
        }}
    >
        <div className='ratio ratio-1x1'>
            <img
                alt="Sample"
                src={image}
                className='object-fit-contain p-1'
            />
        </div>
        <CardBody className='d-flex flex-column justify-content-between'>
            <RouterLink to={`/product/${jewelery.id}`} >
                <CardTitle tag="h6">
                    {title ? title : 'title'}
                </CardTitle>
            </RouterLink>
            <div>
                <div className='d-flex px-3'>
                    <img style={{ width: '25px', height: '25px' }} src={star} />
                    <span className='ms-1 me-3'>
                        {rating.rate}
                    </span>
                    <span>
                        {rating.count}
                    </span>
                </div>
                <div className='w-100 d-flex justify-content-between px-3 align-items-center'>
                    <span className='d-flex align-items-center pe-3'>
                        {jewelery.price}$
                    </span>
                    {status === 'idle' || status === 'pending' ? <Spinner /> : !user ? '' : isExist ? 'in basket' : <Button color='warning' outline className='rounded-circle z-10' onClick={addToCard} >
                        <img style={{ width: '25px', height: '25px' }} src={add} />
                    </Button>}
                </div>
            </div>
        </CardBody>
    </Card>
}

ProductCard.propTypes = {
    jewelery: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.number,
        rating: PropTypes.shape({
            rate: PropTypes.number,
            count: PropTypes.number,
        }),
        price: PropTypes.number,
        image: PropTypes.string,
    }).isRequired,
    customStyle: PropTypes.shape({
        color: PropTypes.string,
        isList: PropTypes.bool,
    })
};

export default ProductCard