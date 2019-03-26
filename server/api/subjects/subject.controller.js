const Sequelize = require('sequelize')
const { Subject, Topic, Question } = require('../../models')

exports.getSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.findAll({
            where: { deptId: req.userData.deptId },
            include: [Topic]
        })
        res.status(200).send(subjects)
    } catch (error) {
        next(error)
    }
}

exports.createSubject = async (req, res, next) => {
    try {
        const subject = await Subject.create({ name: req.body.name, deptId: req.userData.deptId })
        res.status(201).send(subject)
    } catch (error) {
        next(error)
    }
}

exports.updateSubject = async (req, res, next) => {
    try {
        await Subject.update({ name: req.body.name }, { where: { subjectId: req.params.sid, deptId: req.userData.deptId }})
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.deleteSubject = async (req, res, next) => {
    try {
        await Subject.destroy({ where: { subjectId: req.params.sid }})
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

// Topic
exports.getTopics = async (req, res, next) => {
    try {
        const topics = await Topic.findAll({ where: { subjectId: req.params.sid } })
        res.status(200).send(topics)
    } catch (error) {
        next(error)
    }
}

exports.createTopic = async (req, res, next) => {
    try {
        const topic = await Topic.create({ name: req.body.name, subjectId: req.params.sid })
        res.status(201).send(topic)
    } catch (error) {
        next(error)
    }
}

exports.updateTopic = async (req, res, next) => {
    try {
        await Topic.update({ name: req.body.name }, { where: { topicId: req.params.tid } })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.deleteTopic = async (req, res, next) => {
    try {
        await Topic.destroy({ where: { topicId: req.params.tid } })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

// Question
exports.getQuestions = async (req, res, next) => {
    try {
        const questions = await Question.findAndCountAll({
            offset: ( parseInt(req.query.pageNumber) - 1 ) * parseInt(req.query.limit),
            limit: parseInt(req.query.limit),
            attributes: {
                exclude: ['topicId'],
                include: [[Sequelize.literal(1), 'selected']]
            },
            include: [{
                model: Topic,
                where: { subjectId: req.params.sid }
            }]
        })
        /*
        Note.
        count - an integer, total number records matching the where clause and other filters due to associations
        rows - an array of objects, the records matching the where clause and other filters due to associations, within the limit and offset range
        */
       res.status(200).send(questions)
    } catch (error) {
        next(error)
    }
}

exports.createQuestion = async (req, res, next) => {
    try {
        const question = await Question.create({
            text: req.body.text,
            score: req.body.score,
            answer: req.body.answer,
            choice1: req.body.choice1,
            choice2: req.body.choice2,
            choice3: req.body.choice3,
            choice4: req.body.choice4,
            choice5: req.body.choice5,
            topicId: req.body.topicId
        })
        res.status(201).send(question)
    } catch (error) {
        next(error)
    }
}

exports.updateQuestion = async (req, res, next) => {
    try {
        await Question.update({
            text: req.body.text,
            score: req.body.score,
            answer: req.body.answer,
            choice1: req.body.choice1,
            choice2: req.body.choice2,
            choice3: req.body.choice3,
            choice4: req.body.choice4,
            choice5: req.body.choice5,
            topicId: req.body.topicId
        }, { where: { questionId: req.params.qid } })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.deleteQuestion = async (req, res, next) => {
    try {
        await Question.destroy({ where: { questionId: req.params.qid } })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}