import {useFetch} from "#app";

export const useProductStore = defineStore('product', () => {
    const products = useState('products', () => [])
    const productsInShoppingList = useState('productsInShoppingList', () => [])
    const categories = useState('categories', () => [])

    async function loadProducts() {
        const {data} = await useFetch('https://localhost:7124/api/product', {})
        if (JSON.parse(localStorage.getItem('productsInShoppingList'))) {
            productsInShoppingList.value = JSON.parse(localStorage.getItem('productsInShoppingList'))
            getCategories()
        }
        products.value = data
    }

    async function addProductToShoppingList(productName) {
        const {data} = await useFetch('https://localhost:7124/api/product/suche?name=' + productName, {
            transform: (fetchedProducts) => {
                return fetchedProducts.filter((fetchedProduct, index, self) => {
                    return index === self.findIndex((product) => (product.productName === fetchedProduct.productName))
                })
            },
            onResponse({response}) {
                /// aufruf shoppinglist controller?
                // console.log(response._data)
            }
        })
        productsInShoppingList.value.push(data.value[0])
        localStorage.setItem('productsInShoppingList', JSON.stringify(productsInShoppingList.value))
        getCategories()
    }

    function removeProductFromShoppingList(productId){
        const productIndex = productsInShoppingList.value.findIndex(product => product.productId === productId)
        productsInShoppingList.value.splice(productIndex, 1)
        localStorage.setItem('productsInShoppingList', JSON.stringify(productsInShoppingList.value))
        getCategories()

    }

    function getCategories() {
        const categoriesMap = new Map()

        productsInShoppingList.value.forEach(product => {
            categoriesMap.set(product.productCategoryId, product.productCategoryName)
        })

        categories.value = Array.from(categoriesMap.keys())
            .sort((a, b) => a - b)
            .map(categoryId => categoriesMap.get(categoryId));
    }

    return {
        products,
        productsInShoppingList,
        loadProducts,
        categories,
        addProductToShoppingList,
        removeProductFromShoppingList
    }
})