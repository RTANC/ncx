const express = require('express')
const router = express.Router()
const { listUsers, approveUser, delUser } = require('./admin.controller')

router.get('/users', listUsers)

router.patch('/users/:uid/approve', approveUser)

router.delete('/users/:uid', delUser)

module.exports = router