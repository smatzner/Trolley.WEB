import {useFetch} from "#app";

export const useShoppingListStore = defineStore('shoppingList', () => {
    const BASE_URL = 'https://localhost:7124'

    const shoppingLists = useState('shoppingLists', () => [])
    const shoppingListsProducts = useState('shoppingListsProducts', () => [])

    async function saveShoppingList(shoppingListProducts, shoppingListName) {
        console.log(shoppingListProducts)
        try {
            const shoppingList = {
                "name": shoppingListName.name,
                "products": shoppingListProducts
            }

            await new Promise((resolve) => {
                useFetch(BASE_URL + '/api/ShoppingList/CreateWithProducts', {
                    method: 'POST',
                    body: JSON.stringify(shoppingList),
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                resolve()
            })
        } catch (e) {
            console.error(e)
        }
    }

    async function getShoppingLists() {
        try {
            await new Promise((resolve) => {
                useFetch(BASE_URL + '/api/ShoppingList/GetAll', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    },
                    onResponse({response}) {
                        shoppingLists.value = response._data.shoppingLists
                        resolve()
                    }
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    async function deleteShoppingList(shoppingListId) {
        try {
            await new Promise((resolve) => {
                useFetch(BASE_URL + `/api/ShoppingList/${shoppingListId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                resolve()
            })
            const shoppingListIndex = shoppingLists.value.findIndex(shoppingList => shoppingList.id === shoppingListId)
            shoppingLists.value.splice(shoppingListIndex, 1)
        } catch (e) {
            console.error(e)
        }
    }

    function useShoppingList(shoppingList) {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList.items))
    }

    async function addProductsToShoppingList(shoppingList, shoppingListId) {
        console.log(shoppingList)

        try {
            await new Promise((resolve) => {
                useFetch(BASE_URL + `/api/ShoppingList/${shoppingListId}/AddProducts`, {
                    method: 'POST',
                    body: JSON.stringify(shoppingList),
                    headers: {
                        Authorization: localStorage.getItem('token')
                    },
                    onResponse({response}) {
                        shoppingListsProducts.value = response._data
                    }
                })
                resolve()
            })
        } catch (e) {
            console.error(e)
        }
    }

    return {
        shoppingLists,
        shoppingListsProducts,
        saveShoppingList,
        getShoppingLists,
        deleteShoppingList,
        useShoppingList
    }
})
