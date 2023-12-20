<template>
  <div class="flex flex-col items-center justify-center p-6 rounded-xl animate-fadeIn">
    <PrimeImage
        src="/donation-trolley2.png"
        alt="Trolley sagt Danke!"
        width="220"
        :pt="{
          image: {class: 'rounded-3xl shadow-lg'}
        }"
    />

    <h3 class="text-4xl font-extrabold text-gray-900 mt-10 mb-6"><span class="text-trolley-primary">Danke</span> für Ihre Spende!</h3>
    <p class="text-lg text-center text-gray-700 mb-8">
      Sie haben erfolgreich gespendet und sind jetzt ein <span class="font-bold text-trolley-primary">Premium User</span>. Vielen Dank für Ihre großzügige
      Unterstützung!
    </p>
    <p class="text-gray-700">Du wirst in <span class="mt-5 italic font-semibold text-trolley-primary mb-4" v-text="countdown"/> Sekunden automatisch auf die <NuxtLink to="/" class="underline text-trolley-primary">Startseite</NuxtLink> zurückgeleitet</p>
  </div>
</template>


<script setup>
const route = useRoute();
const sessionId = ref('');

const countdown = ref(10);
let countdownInterval = null;

const userStore = useUserStore()
const authStore = useAuthStore()
const userId = computed(() => authStore.user.id)

onMounted( async() => {
  sessionId.value = route.query.session_id;
  await completeDonation();
  startCountdown();
});

const completeDonation = async () => {
  console.log(userId.value)
  await userStore.updateUserRole(userId.value,'PremiumUser')
  await authStore.initializeStore()
}

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(countdownInterval);
      navigateTo('/');
    }
  }, 1000);
};

watch(() => route.query.session_id, () => {
  if (route.query.session_id) {
    clearInterval(countdownInterval);
  }
});
</script>

<style>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in;
}
</style>