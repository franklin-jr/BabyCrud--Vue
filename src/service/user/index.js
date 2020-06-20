import settings from '@/settings'


let login = (headers, data) => {
  return fetch(`${settings.excaliburApi}/signin`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    cache: 'default',
    headers: headers
  })
}



export default {
  login
}