const Router  = require('../../../routes/router')
const {Utils} = require('../../../utils')
const {UserController} = require('../controllers')
const verifyToken = require('../authjwt')


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
        
        this.app.post('/register', UserController.registerUser)

        this.app.post('/login', UserController.signinUser)

        this.app.put('/userUpdate/:id', UserController.updateUser)

        this.app.delete('/userDeleted/:id', UserController.deleteUser)

        this.app.get('/verifyToken', verifyToken, UserController.verifyToken)

        

    }
}

module.exports = UserRoutes