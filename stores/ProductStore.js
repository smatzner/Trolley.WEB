export const useProductStore = defineStore('product', () => {
        const products = useState('products', () => [])
        const productsInShoppingList = useState('productsInShoppingList', () => [])
        const categories = useState('categories', () => [])
        const shoppingList = useState('shoppingList', () => [])
        const costsPerMarket = useState('costsPerMarket', () => [
            {"marketName": "Billa", "totalPrice": 0},
            {"marketName": "Spar", "totalPrice": 0},
            {"marketName": "Hofer", "totalPrice": 0}
        ])

        async function loadProducts() {
            await new Promise((resolve, reject) => {
                useFetch('https://localhost:7124/api/product', {
                    onResponse({response}) {
                        products.value = response._data
                        resolve()
                    },
                    onError(error) {
                        reject(error)
                    }
                })
            })

            if (JSON.parse(localStorage.getItem('shoppingList'))) {
                shoppingList.value = JSON.parse(localStorage.getItem('shoppingList'))
                shoppingList.value.forEach(productInShoppingList => {
                    const matchingProduct = products.value.find(product => product.productId === productInShoppingList.productId ?? product)
                    productsInShoppingList.value.push({...matchingProduct, amount: productInShoppingList.amount})
                })
                getCategories()
                await AddProductsAndCalculateList(shoppingList.value)
            }
        }

        async function addProductToShoppingList(shoppingListProduct) {
            try {
                await new Promise((resolve) => {
                    useFetch('https://localhost:7124/api/product/search?name=' + shoppingListProduct.productName, {
                        onResponse({response}) {
                            const fetchedProduct = response._data.find(fetchedProduct => {
                                return (
                                    fetchedProduct.isOrganic === shoppingListProduct.isOrganic &&
                                    fetchedProduct.isDiscountProduct === shoppingListProduct.isDiscountProduct
                                )
                            })
                            if (productsInShoppingList.value.find(product => product.productId === fetchedProduct.productId)) {
                                const productIndex = productsInShoppingList.value.findIndex(product => product.productId === fetchedProduct.productId)
                                productsInShoppingList.value[productIndex].amount += shoppingListProduct.amount
                                shoppingList.value[productIndex].amount += shoppingListProduct.amount
                            } else {
                                productsInShoppingList.value.push({...fetchedProduct, amount: shoppingListProduct.amount})
                                shoppingList.value.push({
                                    productId: fetchedProduct.productId,
                                    amount: shoppingListProduct.amount
                                })
                            }
                            localStorage.setItem('shoppingList', JSON.stringify(shoppingList.value))
                            resolve()
                        }
                    })
                })
                // const {data} = await useFetch('/api/product/suche?name=' + productName,{
                //         transform: (fetchedProducts) => {
                //             return fetchedProducts.filter((fetchedProduct, index, self) => {
                //                 return index === self.findIndex((product) => (product.productName === fetchedProduct.productName))
                //             })
                //         },
                //         onResponse({response}) {
                //             /// aufruf shoppinglist controller?
                //             // console.log(response._data)
                //         }
                // })
                // const data = null
                // console.log(data)

                await AddProductsAndCalculateList(shoppingList.value)

                getCategories()
            } catch (e) {
                console.error(e)
            }
        }

        async function updateProductFromShoppingList(updatedProduct){
            const productIndex = productsInShoppingList.value.findIndex(product => product.productId === updatedProduct.productId)

            console.log(updatedProduct)

            productsInShoppingList.value.splice(productIndex, 1)
            shoppingList.value.splice(productIndex, 1)

            await addProductToShoppingList(updatedProduct)

        }

        async function removeProductFromShoppingList(productId) {
            const productIndex = productsInShoppingList.value.findIndex(product => product.productId === productId)

            productsInShoppingList.value.splice(productIndex, 1)
            shoppingList.value.splice(productIndex, 1)
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList.value))

            getCategories()
            await AddProductsAndCalculateList(shoppingList.value)
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

        async function AddProductsAndCalculateList(products) {
            const {data} = await useFetch('https://localhost:7124/api/TemporaryShoppingList/AddProductAndCalculateList', {
                method: 'POST',
                body: JSON.stringify(products),
            })
            costsPerMarket.value = data
        }

        return {
            products,
            productsInShoppingList,
            categories,
            costsPerMarket,
            shoppingList,
            loadProducts,
            addProductToShoppingList,
            updateProductFromShoppingList,
            removeProductFromShoppingList
        }
    }
)