const jwt = require('jsonwebtoken')
const moment = require('moment')
const axios = require('axios')
const { Teacher, Log, Student, Subject, Question } = require('../../models')

exports.teacherSignin = async (req, res, next) => {
    try {
        const ticket = await axios.get('https://oauth2.googleapis.com/tokeninfo?id_token=' + req.headers.authorization.split(" ")[1])
        const payload = ticket.data
        const teacher = await Teacher.findOrCreate({ where: { googleId: payload.sub }, defaults: { fullname: payload.name }}).spread((teacher, created) => { return teacher })
        const log = await Log.create({ teacherId: teacher.teacherId })
        console.log(log)
        const token = await jwt.sign({ teacherIdd: teacher.teacherId, deptId: (teacher.deptId !== "undefined") ? teacher.deptId : null }, process.env.JWT_KEY, { expiresIn: '1d' })
        res.status(200).send(token)
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