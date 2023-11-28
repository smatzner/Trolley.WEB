export const useProductStore = defineStore('product', () => {
    const products = ref([
        {
            id: 1,
            categoryId: 1,
            categoryName: 'Obst',
            subCategoryName: 'Heidelbeeren',
            isOrganic: false,
            isBrandedProduct: false,
            amount: 1,
            brandId: 1,
            brandName: 'S-Budget',
            marketId: 1,
            marketName: 'Spar',
            icon: '/icons/blueberries.svg'
        },
        {
            id: 2,
            categoryId: 3,
            categoryName: 'Milchprodukte',
            subCategoryName: 'Camembert',
            isOrganic: true,
            isBrandedProduct: false,
            amount: 2,
            brandId: 2,
            brandName: 'Ja Natürlich!',
            marketId: 2,
            marketName: 'Billa',
            icon: '/icons/cheesse.svg'
        },
        {
            id: 3,
            categoryId: 3,
            categoryName: 'Milchprodukte',
            subCategoryName: 'Vollmilch',
            isOrganic: true,
            isBrandedProduct: false,
            amount: 2,
            brandId: 2,
            brandName: 'Ja Natürlich!',
            marketId: 2,
            marketName: 'Billa',
            icon: '/icons/milk.svg'
        },
        {
            id: 4,
            categoryId: 2,
            categoryName: 'Gemüse',
            subCategoryName: 'Kartoffel',
            isOrganic: true,
            isBrandedProduct: false,
            amount: 2,
            brandId: 2,
            brandName: 'Ja Natürlich!',
            marketId: 2,
            marketName: 'Billa',
            icon: '/icons/potato.svg'
        },
    ])
    const categories = computed(() => getCategories())

    function loadProducts() {

    }

    function getCategories() {
        const categoriesMap = new Map()

        products.value.forEach(product => {
            categoriesMap.set(product.categoryId, product.categoryName)
        })

        return Array.from(categoriesMap.keys())
            .sort((a, b) => a - b)
            .map(categoryId => categoriesMap.get(categoryId));
    }

    return {
        products,
        categories
    }
})