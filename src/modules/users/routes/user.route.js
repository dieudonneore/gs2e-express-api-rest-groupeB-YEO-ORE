const Router  = require('../../../routes/router')
const {Utils} = require('../../../utils')
const {UserController} = require('../controllers')


class UserRoutes extends Router{

    constructor(app){
        super(app)
    }

    getRoutes(){

        /* this.app.get('/test', (req, res) =>{
            return Utils.apiResponse(res, UserController.testModules())
        }); */

        this.app.get('/allUsers', UserController.findAllUser)

        this.app.get('/users/:id', UserController.findOneUser)
        
        this.app.post('/addUser', UserController.createUser)

        this.app.put('/userUpdate/:id', UserController.updateUser)

        this.app.delete('/userDeleted/:id', UserController.deleteUser)

    }
}

module.exports = UserRoutes