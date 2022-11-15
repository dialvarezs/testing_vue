import { defineStore } from 'pinia'

interface TokenState {
    token: string | null
    tokenType: string | null
}

export const useTokenStore = defineStore({
    id: 'token',
    state: (): TokenState => ({
        token: localStorage.getItem('token') || null,
        tokenType: localStorage.getItem('tokenType') || null,
    }),
    getters: {
        isAuthenticated: (state: TokenState) => state.token != null
    },
    actions: {
        setToken(token: string, tokenType: string) {
            this.token = token
            this.tokenType = tokenType

            localStorage.setItem('token', token)
            localStorage.setItem('tokenType', tokenType)
        }
    }
})