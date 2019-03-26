import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000
})

export default {
    createSubject (name) {
        return api.post('/subjects', { name: name })
    }
}