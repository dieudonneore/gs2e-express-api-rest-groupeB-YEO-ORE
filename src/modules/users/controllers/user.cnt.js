const {UserModel} = require('../../users/models/user.model')

class UserController{

    static testModules(){
        let newUser = new UserModel({login: "test3", password:"test3pass"})
        newUser.save()
        return Promise.resolve({status: 200, error: false, message: "version 1.0.0", data: newUser})
    }

    static getUser(req, res){

        return Promise.resolve({status: 200, error: false, message: "All users ", data: allUsers})
    }

    static registration = (req, res) => {
        let user = new UserModel({
            nom:"Ore",//req.body.nom
            prenom:"dieudonne",//req.body.prenom
            login:"dore",//req.body.login
            password:"admin1234567890",//req.body.password
            status:0,//req.body.status
            tokens:[]//req.body.status
        })
        user.save()
        return Promise.resolve({ status:200, error: false, message: "Successfully Registered", data: user})
    }
/*  
    signin = (req, res) => {req.body.status
        const user =  UserModel.findByCredentials(req.body.login, req.body.password)
        const token =  user.generateAuthToken()
        return Promise.resolve({ status:200, error: false, message: "Successfully Signin", data: {userData:user, token}})
    } */
}

module.exports = UserController