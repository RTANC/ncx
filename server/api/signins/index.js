const express = require('express')
const router = express.Router()
const { userSignin } = require('./signin.controller')

router.post('/', userSignin)

module.exports = router