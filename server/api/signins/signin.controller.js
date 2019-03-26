const jwt = require('jsonwebtoken')
const axios = require('axios')
const { User, Log } = require('../../models')

exports.userSignin = async (req, res, next) => {
    try {
        const ticket = await axios.get('https://oauth2.googleapis.com/tokeninfo?id_token=' + req.headers.authorization.split(" ")[1])
        const payload = ticket.data
        const user = await User.findOne({ where: { googleId: payload.sub }})
        if (!user) {
            res.status(200).send({ userId: null })
        } else {
            await Log.create({ userId: user.userId })
            const token = await jwt.sign({ userId: user.userId, role: user.role, deptId: user.deptId, stdId: user.stdId }, process.env.JWT_KEY, { expiresIn: '1d' })
            res.status(200).send({
                userId: user.userId,
                role: user.role,
                deptId: user.deptId,
                stdId: user.stdId,
                token: token
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.studentSignin = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}