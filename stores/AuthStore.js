import {useFetch} from "#app";

export const useAuthStore = defineStore('auth', () => {
    const AUTH_API_URL = 'https://localhost:7124/api/Auth/';

    const token = useState('token', () => '')
    const isLoggedIn = useState('isLoggedIn', () => false)
    const loginDialog = useState('loginDialog', () => false)
    const registrationDialog = useState('registrationDialog', () => false)

    function initializeStore() {
        if (typeof window !== 'undefined') {
            token.value = localStorage.getItem('token');
            isLoggedIn.value = !!token.value;
        }
    }

    async function register(username, password) {
        try {
            const {data} = await useFetch(`${AUTH_API_URL}Register`, {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (data.value && data.value.jwtToken) {
                token.value = data.value.jwtToken.replace("Bearer ", "")
                localStorage.setItem('token', token)
                isLoggedIn.value = true
                registrationDialog.value = false
            }
        } catch (e) {
            throw e
        }
    }

    async function login(username, password) {
        try {
            const {data} = await useFetch(`${AUTH_API_URL}Login`, {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (data.value && data.value.jwtToken) {
                token.value = data.value.jwtToken.replace("Bearer ", "")
                localStorage.setItem('token', token)
                isLoggedIn.value = true
                loginDialog.value = false
            }
        } catch (e) {
            throw e
        }
    }

    function logout(){
        token.value = null
        isLoggedIn.value = false
        localStorage.removeItem('token')
    }

    return{
        isLoggedIn,
        loginDialog,
        registrationDialog,
        initializeStore,
        register,
        login,
        logout
    }
})