const axios = require('axios')
const { User } = require('../../models')
exports.userRegister = async (req, res, next) => {
    try {
        const ticket = await axios.get('https://oauth2.googleapis.com/tokeninfo?id_token=' + req.headers.authorization.split(" ")[1])
        const payload = ticket.data
        const user = await User.create({ where: { googleId: payload.sub }, defaults: { fullname: payload.name, role: req.body.role, stdId: (typeof req.body.stdId == 'undefined') ? null : req.body.stdId }})
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}