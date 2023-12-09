import { defineStore } from 'pinia';
import { useFetch } from '#app';

const AUTH_API_URL = 'https://localhost:7124/api/Auth/';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        isLoggedIn: false
    }),
    actions: {
        initializeStore() {
            if (typeof window !== 'undefined') {
                this.token = localStorage.getItem('token');
                this.isLoggedIn = !!this.token;
            }
        },
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

                if (data.value && data.value.jwtToken) {
                    const token = data.value.jwtToken.replace("Bearer ", "");
                    this.token = token;
                    localStorage.setItem('token', token);
                    this.isLoggedIn = true;
                } else {
                    throw new Error('Kein Token in der Antwort erhalten');
                }
                
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
                    throw new Error('LoginFehler: ' + error.value.message);
                }

                if (data.value && data.value.jwtToken) {
                    const token = data.value.jwtToken.replace("Bearer ", "");
                    this.token = token;
                    localStorage.setItem('token', token);
                    this.isLoggedIn = true;
                } else {
                    throw new Error('Kein Token in der Antwort erhalten');
                }
                
            } catch (e) {
                console.error(e.message);
                throw e;
            }
        },

        
        logout() {
            this.token = null;
            this.isLoggedIn = false;
            localStorage.removeItem('token');
        }
    }
});
