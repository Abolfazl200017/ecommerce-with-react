import { Card, CardBody, CardTitle, Button } from 'reactstrap'
import PropTypes from 'prop-types';

function ProductCard({ jewelery, customStyle }) {
    const { title, image } = jewelery
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
                <Button>
                    Button
                </Button>
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