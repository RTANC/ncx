const express = require('express')
const router = express.Router()

const auth = require('./middleware/check-auth')

const signinRoutes = require('./signins')
const registerRoutes = require('./registers')
const subjectRoutes = require('./subjects')
const adminRoutes = require('./admins')

router.use('/signins', signinRoutes)
router.use('/registers', registerRoutes)
router.use(auth)
router.use('/subjects', subjectRoutes)
router.use('/admins', (req, res, next) => {
    if (req.userData.role == 0) {
        next()
    } else {
        res.sendStatus(401)
    }
}, adminRoutes)

module.exports = router