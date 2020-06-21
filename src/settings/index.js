const PRODUCTION = process.env.NODE_ENV === 'production'

export default {
  urlApi: PRODUCTION ? 'https://urldeprod.com.br' : 'http://localhost:5000',
}