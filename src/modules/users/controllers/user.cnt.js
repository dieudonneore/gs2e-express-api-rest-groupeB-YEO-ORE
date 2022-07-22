const {UserModel} = require('../../users/models/user.model')

class UserController{

    static testModules(){
        let newUser = new UserModel({login: "test3", password:"test3pass"})
        newUser.save()
        return Promise.resolve({status: 200, error: false, message: "version 1.0.0", data: newUser})
    }

    
}

module.exports = UserController