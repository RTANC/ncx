const express = require('express')
const router = express.Router()

const auth = require('./middleware/check-auth')

const signinRoutes = require('./signins')
const subjectRoutes = require('./subjects')
const examRoutes = require('./exams')
const studentRoutes = require('./students')

router.use('/signins', signinRoutes)
router.use(auth)
router.use('/subjects', subjectRoutes)
router.use('/exams', examRoutes)
router.use('/students', studentRoutes)

module.exports = router