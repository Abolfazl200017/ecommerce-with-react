import * as React from "react";
import FullPageSpinner from "../components/full-page-loading";
import client from "../utils/api-client";
import Card from '../components/card'

function ProductList() {
    const [products, setProducts] = React.useState(null)

    React.useEffect(() => {
        client('products').then(setProducts)
    }, [])

    if (!products)
        return <FullPageSpinner />

    return <div className='row overflow-x-hidden container-lg' >
        {products.map((j, index) => {
            return <div key={index} className='col-12 col-md-4 col-lg-3 flex-nowrap mt-3' >
                <Card jewelery={j} customStyle={{ color: "#3f2405", isList: true }} />
            </div>
        })}
    </div>
}

export default ProductList