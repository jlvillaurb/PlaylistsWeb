import createPersistedState from 'vuex-persistedstate'

export default async ({ app, router, store, Vue}) => {
    window.setTimeout(() => {
        createPersistedState({
            paths: ['users']
        })(store)
    },0)
}

