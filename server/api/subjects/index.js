const express = require('express')
const router = express.Router()

const { getSubjects, createSubject, updateSubject, deleteSubject, getTopics, createTopic, updateTopic, deleteTopic, getQuestions, createQuestion, updateQuestion, deleteQuestion } = require('./subject.controller')

//Subject
router.get('/', getSubjects)

router.post('/', createSubject)

router.patch('/:sid', updateSubject)

router.delete('/:sid', deleteSubject)

//Topic
router.get('/:sid/topics', getTopics)

router.post('/:sid/topics', createTopic)

router.patch('/:sid/topics/:tid', updateTopic)

router.delete('/:sid/topics/:tid', deleteTopic)

//Question
router.get('/:sid/questions', getQuestions)

router.post('/:sid/questions', createQuestion)

router.patch('/:sid/questions/:qid', updateQuestion)

router.delete('/:sid/questions/:qid', deleteQuestion)

module.exports = router