import { defineStore } from 'pinia';
import { useFetch } from '#app';

const AUTH_API_URL = 'https://localhost:7124/api/Auth/';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        async register(username, password) {
            try {
                const { data, error } = await useFetch(`${AUTH_API_URL}Register`, {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (error.value) {
                    throw new Error('Registrierungsfehler: ' + error.value.message);
                }

                // Weitere Aktionen nach der Registrierung
            } catch (e) {
                console.error(e.message);
                throw e;
            }
        },

        async login(username, password) {
            try {
                const { data, error } = await useFetch(`${AUTH_API_URL}Login`, {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (error.value) {
                    throw new Error('Loginfehler: ' + error.value.message);
                }

                if (data.value) {
                    this.user = data.value.user;
                    this.token = data.value.token;
                    // Speichern des Tokens im Speicher (nicht im Local Storage)
                }
            } catch (e) {
                console.error(e.message);
                throw e;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            // Weitere Bereinigungsaktionen bei Logout
        }
    }
});
