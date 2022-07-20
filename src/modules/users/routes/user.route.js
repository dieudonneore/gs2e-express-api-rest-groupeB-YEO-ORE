const Router  = require('../../../routes/router')
const Utils = require('../../../utils/utils')
const UserController = require('../controllers/user.cnt')


const register = UserController.registration;

class UserRoutes extends Router{

    constructor(app){
        super(app)
    }

    getRoutes(){

        this.app.get('/test', (req, res) =>{
            return Utils.apiResponse(res, UserController.testModules())
        });

        this.app.get('/users', (req, res) => {
            return Utils.apiResponse(res, UserController.getUser())
        });


        this.app.post('/user/signup', (req, res) => {
            return Utils.apiResponse(res, register)
        });


       /*  this.app.post('/user/signin', (req, res) => {
            return Utils.apiResponse(res, UserController.signin)
        }); */

    }
}

module.exports = UserRoutes