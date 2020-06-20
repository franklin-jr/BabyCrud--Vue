import shared from '../shared'
import { userDao } from '@/service'


export default {
	state: {
		user: null
		},
	mutations: {
		setUser (state, payload) {
			state.user = payload
		}
	},
	actions: {
	
		signOut ({ commit }) {
			commit('setUser', null)
			commit('setAuthHeader', null )
		},

		//Metodo de login===========================
		signIn ({ commit }, payload) {
			commit('setLoading', true)
			userDao.login(shared.state.headers, payload).then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw new Error(response.statusText)
			}
			}).then(json => {
				commit('setUser', json)
			}).catch(error => {
				commit('setLoading', false)
				commit('setErrorMessage', error)
			})
		},
	},
    
	getters: {
		user (state) {
			return state.user
		}
	}
}