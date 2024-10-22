import { Card, CardBody, CardTitle, Button } from 'reactstrap'
import PropTypes from 'prop-types';
import star from '../assets/images/star.png'
import add from '../assets/images/add-to-cart.png'

function ProductCard({ jewelery, customStyle }) {
    const { title, image, rating } = jewelery
    const { color, isList } = customStyle
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
            <CardTitle tag="h6">
                {title ? title : 'title'}
            </CardTitle>
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
                    <Button color='warning' outline className='rounded-circle'>
                        <img style={{ width: '25px', height: '25px' }} src={add} />
                    </Button>
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