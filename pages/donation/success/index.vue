<template>
  <div>
    <h1>Spendenerfolg</h1>
    <p>Sie haben erfolgreich gespendet! Wir verarbeiten Ihre Spende.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';


const route = useRoute();
const sessionId = ref('');

onMounted(() => {
  sessionId.value = route.query.session_id;
  completeDonation();
});

const completeDonation = async () => {
  try {
    await useFetch(`/api/Donation/success?sessionId=${sessionId.value}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    // Hier können Sie weitere Aktionen durchführen, z. B. den Benutzer über den Erfolg informieren oder zu einer anderen Seite weiterleiten.
  } catch (error) {
    console.error('Fehler beim Abschließen der Spende:', error);
  }
};
</script>
