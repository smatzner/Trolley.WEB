import {useFetch} from "#app";

export const useAuthStore = defineStore('auth', () => {
    const AUTH_API_URL = 'https://localhost:7124/api/Auth/';

    const token = useState('token', () => '')
    const user = useState('user', () => {})
    const role = computed(() => user.value.role)
    const isLoggedIn = useState('isLoggedIn', () => false)
    const loginDialog = useState('loginDialog', () => false)
    const registrationDialog = useState('registrationDialog', () => false)

    async function initializeStore() {
        if (typeof window !== 'undefined' && localStorage.getItem('token')) {
            token.value = localStorage.getItem('token');
            const {data, error} = await useFetch(`${AUTH_API_URL}Get`, {
                headers: {
                    Authorization: token.value
                },
                onResponseError({response}) {
                    localStorage.removeItem('token')
                }
            })

            token.value = data.value.jwtToken
            user.value = data.value.user
            isLoggedIn.value = !!token.value;
        }
    }

    async function register(username, password) {
        const {data, error} = await useFetch(`${AUTH_API_URL}Register`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (error.value) throw error.value.data

        user.value = data.value.user

        if (data.value && data.value.jwtToken) {
            // token.value = data.value.jwtToken.replace("Bearer ", "")
            token.value = data.value.jwtToken
            localStorage.setItem('token', token.value)
            isLoggedIn.value = true
            registrationDialog.value = false
        }
    }

    async function login(username, password) {

        const {data, error} = await useFetch(`${AUTH_API_URL}Login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (error.value) throw error.value.data

        user.value = data.value.user

        if (data.value && data.value.jwtToken) {
            token.value = data.value.jwtToken
            localStorage.setItem('token', token.value)
            isLoggedIn.value = true
            loginDialog.value = false
        }
    }

    function logout() {
        token.value = ''
        user.value = {}
        isLoggedIn.value = false
        localStorage.removeItem('token')
    }

    return {
        user,
        role,
        isLoggedIn,
        loginDialog,
        registrationDialog,
        initializeStore,
        register,
        login,
        logout
    }
})