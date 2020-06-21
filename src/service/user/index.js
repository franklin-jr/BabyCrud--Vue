import settings from '@/settings'


let saveUser = (headers, data) => {
  return fetch(`${settings.urlApi}/users`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    cache: 'default',
    headers: headers
  })
}



export default {
  saveUser
}