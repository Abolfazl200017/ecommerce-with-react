const listItemsKey = '__card_items__'
let listItems = {}
const persist = () =>
    window.localStorage.setItem(listItemsKey, JSON.stringify(listItems))
const load = () =>
    Object.assign(
        listItems,
        JSON.parse(window.localStorage.getItem(listItemsKey)),
    )

const reset = () =>
    window.localStorage.removeItem(listItemsKey)

// initialize
try {
    load()
} catch {
    persist()
    // ignore json parse error
}

function addProduct({
    id,
}) {
    if (listItems[id]) {
        console.log(listItems, id, listItems[id])
        listItems[id].quantity += 1
    } else {
        const newItem = {
            id: id,
            quantity: 1,
        }
        listItems[id] = newItem
    }
    persist()
}

function decreaseProductQuantity({
    id
}) {
    if (!listItems[id])
        return
    else {
        if (listItems[id].quantity > 0)
            listItems[id].quantity -= 1
        else
            delete listItems[id]
    }
}

function readCard() {
    return listItems
}

export { load, readCard, addProduct, reset, decreaseProductQuantity }
