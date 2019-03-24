const Sequelize = require('sequelize')

const sequelize = new Sequelize('ncx', 'sa', 'Intell1', {
    host: '192.168.100.10',
    dialect: 'mssql',
    pool: {
      max: 30,
      min: 10,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
      freezeTableName: true
    }
})

const Teacher = sequelize.define('teachers', {
    teacherId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    googleId: { type: Sequelize.STRING, allowNull: false, unique: true },
    fullname: { type: Sequelize.STRING, allowNull: false },
    deptId: { type: Sequelize.TINYINT, allowNull: true }
})

const Log = sequelize.define('logs', {
    logId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
})

const Subject =  sequelize.define('subjects', {
    subjectId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    deptId: { type: Sequelize.TINYINT, allowNull: true }
})

const Topic = sequelize.define('topics', {
    topicId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false }
})

const Question = sequelize.define('questions', {
    questionId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: Sequelize.TEXT, allowNull: false },
    score: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 1 },
    answer: { type: Sequelize.TINYINT, allowNull: false },
    choice1: { type: Sequelize.TEXT, allowNull: false },
    choice2: { type: Sequelize.TEXT, allowNull: false },
    choice3: { type: Sequelize.TEXT, allowNull: false },
    choice4: { type: Sequelize.TEXT, allowNull: false },
    choice5: { type: Sequelize.TEXT, allowNull: true }
})

const Student = sequelize.define('students', {
    googleId: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
    fullname: { type: Sequelize.STRING, allowNull: false }
})

Teacher.hasMany(Log, { foreignKey: 'teacherId' })
Log.belongsTo(Teacher, { foreignKey: 'teacherId' })

Subject.hasMany(Topic, { foreignKey: 'subjectId', onDelete: 'cascade'})
Topic.belongsTo(Subject, { foreignKey: 'subjectId', onDelete: 'cascade'})

Topic.hasMany(Question, { foreignKey: 'topicId', onDelete: 'cascade' })
Question.belongsTo(Topic, { foreignKey: 'topicId', onDelete: 'cascade' })

sequelize.sync({ force: true })

module.exports = { Teacher, Log, Subject, Topic, Question, Student }