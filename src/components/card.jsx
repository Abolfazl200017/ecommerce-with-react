import { Card, CardBody, CardTitle, Button } from 'reactstrap'
import PropTypes from 'prop-types';

function ProductCard({ jewelery }) {
    const { title, image } = jewelery

    return <Card
        style={{
            width: '100%'
        }}
    >
        <div className='ratio ratio-1x1'>
            <img
                alt="Sample"
                src={image}
                className='object-fit-contain p-1'
            />
        </div>
        <CardBody>
            <CardTitle tag="h6">
                {title ? title : 'title'}
            </CardTitle>
            {/* <CardText>
                {description}
            </CardText> */}
            <Button>
                Button
            </Button>
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
};

export default ProductCard