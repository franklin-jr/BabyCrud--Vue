let getInfo = (cep) => {
    return fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: 'GET',
      cache: 'default'
    })
  }
  
  
  export default {
    getInfo
  }