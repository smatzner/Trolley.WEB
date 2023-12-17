<script setup>
import {loadStripe} from "@stripe/stripe-js";

const donationStore = useDonationStore()
const donationDialog = computed(() => donationStore.donationDialog)
const visible = ref(false)

watch(donationDialog, () => visible.value = donationDialog.value)
watch(visible, () => donationStore.donationDialog = visible.value)

const whiteLabel = ref(false)
const amount = ref()

const BASE_API_URL = 'https://localhost:7124';
const isProcessing = ref(false);

const handleCheckout = async () => {
  try {
    isProcessing.value = true;
    const {data} = await useFetch(`${BASE_API_URL}/api/Donation/CreateDonation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({amount: amount.value * 100})
    });
    const responseData = data.value;
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
  const result = await stripe.redirectToCheckout({sessionId});
  if (result.error) {
    console.error('Fehler beim Stripe Checkout:', result.error.message);
  }
};

</script>

<template>
  <PrimeDialog
      v-model:visible="visible"
      modal
      :pt="{mask: {style: 'backdrop-filter: blur(2px)'}}"
      dismissable-mask
  >
    <template #container="{closeCallback}">
      <div class="px-7 pt-4 pb-2 rounded-md bg-gradient-to-r from-green-400 to-trolley-accent">
        <PrimeProgressBar
            v-if="isProcessing"
            mode="indeterminate"
            class="h-2 bg-white mb-3"
            :pt="{
            value:{class: 'bg-trolley-primary'}
          }"
        />
        <h1 class="text-xl font-semibold text-white">Unterstütze Trolley</h1>
        <div class="w-80 bg-white mt-5 mb-3 p-3 rounded-md">
          <p>Jede Spende hilft uns, unsere App zu verbessern und für alle Nutzer
            kostenlos zu halten. Deinen Beitrag macht einen großen Unterschied</p>
          <p class="mt-2">Danke für deine Unterstützung!</p>
        </div>
        <div class="mt-7">
          <span class="p-float-label">
            <PrimeInputNumber
                v-model.number="amount"
                highlight-on-focus
                id="donation-input"
                show-buttons
                class="w-full"
                @focus="whiteLabel = true"
                @blur="!amount ? whiteLabel = false : whiteLabel = true"
                :min="0"
                mode="currency"
                currency="EUR"
                steps="5"
                locale="de-AT"
                :pt="{
                  incrementButton: {root: {class: 'bg-trolley-primary border-trolley-primary'}},
                  decrementButton: {root: {class: 'bg-trolley-primary border-trolley-primary'}},
                }"
            />
            <label for="donation-input" :class="whiteLabel ? 'text-white font-semibold' : 'text-gray-400'">Beitrag wählen</label>
          </span>
        </div>
        <div class="flex align-items-center gap-2">
          <PrimeButton
              @click="handleCheckout"
              label="Spenden"
              text
              class="p-3 w-full text-white border-1 border-white-alpha-30 hover:bg-white-alpha-10"
              type="submit"
          />
          <PrimeButton label="Abbrechen" @click="closeCallback" text class="p-3 w-full text-white"/>
        </div>
      </div>
    </template>
  </PrimeDialog>
</template>

<style scoped>

</style>