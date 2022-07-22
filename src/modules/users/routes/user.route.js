const Router  = require('../../../routes/router')
const {Utils} = require('../../../utils')
const {UserController} = require('../controllers')


class UserRoutes extends Router{

    constructor(app){
        super(app)
    }

    getRoutes(){

        this.app.get('/test', (req, res) =>{
            return Utils.apiResponse(res, UserController.testModules())
        });

    }
}

module.exports = UserRoutes