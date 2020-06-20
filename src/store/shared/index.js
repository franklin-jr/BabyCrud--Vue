export default {
    state: {
        headers: {
          'Content-Type': 'application/json'
        },
        loading: false,
        errorMessage: null,
      },
      mutations: {
        setAuthHeader (state, payload) {
          state.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload}`
          })
        },
        setLoading (state, payload) {
          state.loading = payload
        },
        setErrorMessage (state, payload) {
          state.errorMessage = payload
        },      
      },
      actions: {
      },   
      getters: {
        headers (state) {
          return state.headers
        },
        loading (state) {
          return state.loading
        },
        errorMessage (state) {
          return state.errorMessage
        },
      }
}