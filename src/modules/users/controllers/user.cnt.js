const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const Config = require('../../../utils/config')
const jwt = require('jsonwebtoken')

class UserController{

   /*  static testModules(){
        let newUser = new UserModel({login: "test3", password:"test3pass"})
        newUser.save()
        return Promise.resolve({status: 200, error: false, message: "version 1.0.0", data: newUser})
    } */

    // creation de user
    static registerUser (req, res){
        const user = new UserModel({
            nom: req.body.nom,
            prenom:req.body.prenom,
            login:req.body.login,
            password:req.body.password,
            status: req.body.status,
            tokens: []
        });
        return user.save().then(data => {
            res.json({
                message: "User Registered successfully",
                user:data
            })
        }).catch(err=>{
            console.log('errr')
        })
    };


    static signinUser(req, res){
        UserModel.findOne({login: req.body.login})
                    .exec((err, user) => {
                        if(err){
                            res.status(500).send({message:err})
                            return
                        }
                        if (!user) {
                            return res.status(404)
                              .send({
                                message: "User Not found."
                              });
                        }

                    //comparaison de mot de passwords
                    const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);

                    // verifiez si password est correct
                    if (!passwordIsValid) {
                        return res.status(401)
                        .send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }

                    //Se connecter avec token de user id
                    var token = jwt.sign({id: user.id}, Config.apiSecret, {expiresIn: 86400});

                    res.status(200).send({
                        user: {
                            id: user._id,
                            login: user.login,
                            fullName: user.nom + " "+ user.prenom,
                        },
                        message: "Login successfull",
                        accessToken: token
                        });

        })
    }


    static verifyToken(req, res){
        if (!user) {
            res.status(403)
              .send({
                message: "Invalid JWT token"
              });
          }
          if (req.user == "admin") {
            res.status(200)
              .send({
                message: "Congratulations! but there is no hidden content"
              });
          } else {
            res.status(403)
              .send({
                message: "Unauthorised access"
              });
          }
    }

    // lire toutes les users
    static findAllUser(req, res){
        const user = UserModel.find().then(data=>{
            res.status(200).json(data)
        }).catch(err=> {
            console.log('error')
        })
        return user
    };

    //  rechercher user par id
    static findOneUser(req, res){
        const user = UserModel.findById(req.params.id).then(data=> res.json(data));
        return user

    };


    // mettre à jour un user
    static updateUser(req, res){
        
        const id = req.params.id;
        let userUpdated = UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
            res.json(data)
        }).catch(err => {
            console.log(err)
        })
        
        return userUpdated
    };

// supprimer un user
    static deleteUser(req, res){
        UserModel.findByIdAndRemove(req.params.id).then(data => {
            if (!data) {
              res.status(404).send({
                message: `User not found.`
              });
            } else {
              res.send({
                message: "User deleted successfully!"
              });
            }
        }).catch(err => {
            res.status(500).send({
              message: err.message
            });
        });

    };

    
}

module.exports = UserController