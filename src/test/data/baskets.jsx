const listItemsKey = '__card_list_items__'
let listItems = {}
const persist = () =>
    window.localStorage.setItem(listItemsKey, JSON.stringify(listItems))
const load = () =>
    Object.assign(
        listItems,
        JSON.parse(window.localStorage.getItem(listItemsKey)),
    )

// initialize
try {
    load()
} catch {
    persist()
    // ignore json parse error
}

async function createUpdate({
    ownerUsername,
    productList,
}) {
    listItems[ownerUsername] = productList
    persist()
}

async function deleteCard({
    ownerUsername
}) {
    delete listItems[ownerUsername]
    persist()
}

function readCard({
    ownerUsername
}) {
    return listItems[ownerUsername]
}

export { readCard, deleteCard, createUpdate }
