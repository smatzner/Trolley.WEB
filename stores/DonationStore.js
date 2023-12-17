export const useDonationStore = defineStore('donation', () => {
    const donationDialog = useState('donationDialog', () => false)

    return{
        donationDialog
    }
})