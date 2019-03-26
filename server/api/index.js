const express = require('express')
const router = express.Router()

const auth = require('./middleware/check-auth')

const signinRoutes = require('./signins')
const registerRoutes = require('./registers')
const subjectRoutes = require('./subjects')

router.use('/signins', signinRoutes)
router.use('/registers', registerRoutes)
router.use(auth)
router.use('/subjects', subjectRoutes)

module.exports = router