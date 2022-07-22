const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    titre: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    etat: {
        required: true, 
        type: String,
    }
})

const TaskModel = mongoose.model('tb-tasks', taskSchema)
module.exports = TaskModel