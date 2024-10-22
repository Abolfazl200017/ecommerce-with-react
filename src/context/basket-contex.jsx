/* eslint-disable no-unused-vars */
import * as React from "react";
export { readCard, addProduct, reset } from '../test/data/basket'
import { useAsync } from '../utils/hooks'
import { readCard, addProduct, reset } from '../test/data/basket'

const BasketContext = React.createContext()
BasketContext.displayName = 'BasketContext'

// eslint-disable-next-line react/prop-types
function BasketProvider({ props }) {
    const {
        data: basket,
        status,
        setData,
        run,
        safeSetState,
    } = useAsync()

    React.useEffect(() => {
        const appDataPromise = readCard()
        run(appDataPromise)
    }, [run])

    const addToBasket = React.useCallback((productId) => {
        addProduct(productId).then()
    }, [])


    const value = React.useMemo(
        () => ({ basket, status, setData, safeSetState, addToBasket, }),
        [addToBasket, basket, safeSetState, setData, status],
    )


    return <BasketContext.Provider value={value} {...props} />
}

function useBasket() {
    const context = React.useContext(BasketContext)
    if (context === undefined) {
        throw new Error(`useBasket must be used within a BasketProvider`)
    }
    return context
}

export { BasketProvider, useBasket }
