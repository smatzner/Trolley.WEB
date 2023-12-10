import {useFetch} from "#app";

export const useShoppingListStore = defineStore('shoppingList', () => {
    const BASE_URL = 'https://localhost:7124'

    const shoppingLists = useState('shoppingLists', () => [])
    const shoppingListsProducts = useState('shoppingListsProducts', () => [])

    async function saveShoppingList(shoppingList, shoppingListName) {
        try {
            await new Promise((resolve) => {
                useFetch(BASE_URL + '/api/ShoppingList/Create', {
                    method: 'POST',
                    body: JSON.stringify(shoppingListName),
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    onResponse({response}) {
                        shoppingLists.value.push(response._data)
                        addProductsToShoppingList(shoppingList, response._data.id)
                    },
                })
                resolve()
            })

            console.log(shoppingLists.value)
        } catch (e) {
            console.error(e)
        }
    }

    async function getShoppingLists() {
        try {
            await new Promise((resolve) => {
                useFetch(BASE_URL + '/api/ShoppingList/GetAll', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    onResponse({response}) {
                        shoppingLists.value = response._data
                        resolve()
                    }
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    async function addProductsToShoppingList(shoppingList, shoppingListId) {
        console.log(shoppingList)

        try {
            await new Promise((resolve) => {
                useFetch(BASE_URL + `/api/ShoppingList/${shoppingListId}/AddProducts`, {
                    method: 'POST',
                    body: JSON.stringify(shoppingList),
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    onResponse({response}) {
                        shoppingListsProducts.value = response._data
                    }
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    return {
        shoppingLists,
        shoppingListsProducts,
        saveShoppingList,
        getShoppingLists
    }
})
