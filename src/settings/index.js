const PRODUCTION = process.env.NODE_ENV === 'production'

export default {
  excaliburApi: PRODUCTION ? 'https://apicred.excalibursistemas.com' : 'http://localhost:3000',
}