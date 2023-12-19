<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-200 p-6 rounded-xl animate-fadeIn">
    <div class="p-6 bg-white rounded-xl shadow-xl transition duration-300 ease-in-out hover:shadow-2xl">
      <PrimeImage src="/donation-trolley2.png" alt="Trolley sagt Danke!" width="250"/>
    </div>
    
    <h3 class="text-4xl font-extrabold text-gray-900 mt-10 mb-6">Danke für Ihre Spende!</h3>
    <p class="text-lg text-center text-blue-1000 mb-8">
      Sie haben erfolgreich gespendet und sind jetzt ein <b>Premium User</b>. Vielen Dank für Ihre großzügige Unterstützung!
    </p>
    <div class="text-2xl font-semibold text-blue-800 mb-4" v-text="countdown"></div>

   
  </div>
</template>


<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const sessionId = ref('');

const countdown = ref(5000);
let countdownInterval = null;

onMounted(() => {
  sessionId.value = route.query.session_id;
  completeDonation();
  startCountdown();
});

const completeDonation = async () => {
  // ... Deine vorhandene Logik ...
};

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(countdownInterval);
      router.push('/'); // Navigiere zur Startseite
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
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in;
}
</style>