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
		saveUser ({ commit }, payload) {
            return new Promise((resolve, reject) => {
				userDao.saveUser(shared.state.headers, payload).then((response) => {
                if (response.ok) {
					commit('setSuccessMessage', {ativo: true, message: 'Baby salvo com sucesso!'})
					resolve(response.json())
                }
              }).catch(error => {
				commit('setErrorMessage', {ativo: true, message: `Não foi possível salvar Baby ! (${error.message})`})
                reject(error)
                
              })
            })
        }, 
	},
    
	getters: {
		user (state) {
			return state.user
		}
	}
}