import { useParams } from 'react-router-dom';

function SingleProduct() {
    const { id } = useParams();


    return <>
        <div>
            143
            {id}
        </div>
    </>
}

export default SingleProduct;