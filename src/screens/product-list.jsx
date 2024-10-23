import * as React from "react";
import client from "../utils/api-client";
import Card from '../components/card'
import CardSkeleton from "../components/skeleton/card-skeleton";

function ProductList() {
    const [products, setProducts] = React.useState(null)
    React.useEffect(() => {
        client('products').then(setProducts)
    }, [])

    if (!products)
        return (<div className='row overflow-x-hidden container-lg vw-100 pt-5' >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <div key={n} className='col-12 col-md-4 col-lg-3 flex-nowrap mt-3' >
                    <CardSkeleton />
                </div>
            ))}
        </div>)

    return <div className='row overflow-x-hidden container-lg pt-5' >
        {products.map((j, index) => {
            return <div key={index} className='col-12 col-md-4 col-lg-3 flex-nowrap mt-3' >
                <Card jewelery={j} customStyle={{ color: "#3f2405", isList: true }} />
            </div>
        })}
    </div>
}

export default ProductList