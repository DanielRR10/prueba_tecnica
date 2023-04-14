const {Schema, model} =  require('mongoose')

const userSchema  =  new Schema({
  email:String,
  role:String,
  status:String,
  password: String
})

module.exports = model("User", userSchema)