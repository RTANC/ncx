const express = require('express')
const router = express.Router()
const {teacherSignin, studentSignin} = require('./signin.controller')

router.post('/teachers', teacherSignin)

router.post('/students', studentSignin)

module.exports = router