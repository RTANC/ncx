const axios = require('axios')
const { User } = require('../../models')
exports.userRegister = async (req, res, next) => {
    try {
        const ticket = await axios.get('https://oauth2.googleapis.com/tokeninfo?id_token=' + req.headers.authorization.split(" ")[1])
        const payload = ticket.data
        const user = await User.findOrCreate({ where: { googleId: payload.sub }, defaults: { fullname: payload.name, role: req.body.role, stdId: (typeof req.body.stdId == 'undefined') ? null : req.body.stdId }}).spread((user, created) => { return user })
        res.status(201).send(user)
    } catch (error) {
        next(error)
    }
}