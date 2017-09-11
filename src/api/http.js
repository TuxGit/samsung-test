import axios from 'axios'

const HTTP = axios.create({
  baseURL: '/static/data/'
})

export default HTTP
