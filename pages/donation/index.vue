<template>
    <div class="stripe-checkout">
        <button @click="handleCheckout" :disabled="isProcessing" class="checkout-button">
            <span v-if="isProcessing">Verarbeitung...</span>
            <span v-else>Spenden</span>
        </button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useFetch } from 'nuxt/app';
import { loadStripe } from '@stripe/stripe-js';

const BASE_API_URL = 'https://localhost:7124';
const isProcessing = ref(false);

const handleCheckout = async () => {
    try {
        isProcessing.value = true;
        const amount = 1000; // input feld
        const { data } = await useFetch(`${BASE_API_URL}/api/Donation/CreateDonation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ amount })
        });
        const responseData = data.value;
        console.log(responseData);
        if (responseData?.sessionId) {
            await redirectToStripeCheckout(responseData.sessionId, responseData.pubKey);
        } else {
            console.error('Fehler beim Erstellen der Stripe-Sitzung');
            isProcessing.value = false;
        }
    } catch (error) {
        console.error('Fehler:', error);
        isProcessing.value = false;
    }
};

const redirectToStripeCheckout = async (sessionId, publicKey) => {
    const stripe = await loadStripe(publicKey);
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
        console.error('Fehler beim Stripe Checkout:', result.error.message);
    }
};


</script>
  
<style scoped>
.checkout-button {
    /* Button-Styling */
}
</style>
  