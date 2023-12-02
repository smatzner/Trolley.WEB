import {useFetch} from "#app";

export const useProductStore = defineStore('product', () => {
    const products = useState('products', () => [])
    const productsInShoppingList = useState('productsInShoppingList', () => [])
    const categories = useState('categories', () => [])

    async function loadProducts() {
        await useFetch('https://localhost:7124/api/product',{
            onResponse({response}) {
                products.value = response._data
            }
        })
    }

    async function loadProductByName(productName){
        await useFetch('https://localhost:7124/api/product/suche?name='+productName, {
            onResponse({response}) {
                productsInShoppingList.value.push(response._data[1])
                getCategories()
            }
        })
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
        loadProductByName
    }
})