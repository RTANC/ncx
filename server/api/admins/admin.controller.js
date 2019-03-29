const { User } = require('../../models')

exports.listUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: { role: 1, deptId: null },
            attributes: ['userId', 'fullname', 'deptId']
        })
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}

exports.approveUser = async (req, res, next) => {
    try {
        console.log(req.params.uid)
        await User.update({ deptId: req.body.deptId }, { where: { userId: req.params.uid } })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.delUser = async (req, res, next) => {
    try {
        await User.destroy({ where: { userId: req.params.uid } })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}