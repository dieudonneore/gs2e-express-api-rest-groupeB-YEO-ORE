const Router = require('../../../routes/router');
const TaskController = require('../controllers/task.cnt')


class TaskRoutes extends Router{

    constructor(app){
        super(app)
    }

    getRoutes(){

        this.app.get('/allTasks', TaskController.findAllTask)

        this.app.get('/tasks/:id', TaskController.findOneTask)
        
        this.app.post('/addTask',TaskController.createTask)

        this.app.put('/taskUpdate/:id', TaskController.updateTask)

        this.app.delete('/taskDeleted/:id', TaskController.deleteTask)
            
    }

}
module.exports = TaskRoutes