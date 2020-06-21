export default {
    state: {
        headers: {
          'Content-Type': 'application/json'
        },
        loading: false,
        errorMessage: {ativo: false, message: null},
        successMessage: {ativo: false, message: null}
      },
      mutations: {
        /*=========Set Header para realizar chamadas com token======== */
       /*  setAuthHeader (state, payload) {
          state.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload}`
          })
        }, */
        setLoading (state, payload) {
          state.loading = payload
        },
        setErrorMessage (state, payload) {
          state.errorMessage = payload
        },
        setSuccessMessage (state, payload) {
          state.successMessage = payload
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
        successMessage (state) {
          return state.successMessage
        },
      }
}