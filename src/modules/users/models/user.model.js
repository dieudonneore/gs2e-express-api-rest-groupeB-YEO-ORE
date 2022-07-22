const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        require: true,
    },
    prenom: {
        type: String,
        require: true,
    },
    login: {
        required: true, 
        type: String,
    },
    password:{
        required: true, 
        type: String,
        minlength: 7,
        validate(value){
           if(value.toLowerCase().includes('password')){
               throw new Error('Password cannot contain "Password"')
           }
        }
    },
    status:{
        type: Number, 
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: false
        }
    }]
})

userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'YeoAndOreJwtToken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (login, password) => {
    const user = await UserModel.findOne ({ login })
    if(!user) {
        throw new Error('Unable to Signin')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
         throw new Error('Unable to Signin')
    }
    return user
}




const UserModel = mongoose.model('tb-users', userSchema)

module.exports = UserModel