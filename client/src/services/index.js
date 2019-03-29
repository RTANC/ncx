import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000
})

export default {
    signin (id_token) {
        return api.post('/signins',{}, {
            headers: { 'Authorization': 'Basic ' + id_token }
        })
    },
    register (data, id_token) {
        return api.post('/registers', data, {
            headers: { 'Authorization': 'Basic ' + id_token }
        })
    },
    createSubject (name) {
        return api.post('/subjects', { name: name })
    },
    listUsers () {
        return api.get('/admins/users')
    },
    approveUser (uid, data) {
        return api.patch('/admins/users/' + uid + '/approve', data)
    },
    deleteUser (uid) {
        return api.delete('/admins/users/' + uid)
    }
}