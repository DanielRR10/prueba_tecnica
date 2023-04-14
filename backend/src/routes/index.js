const {Router} =  require('express')
const router = Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {STATUS} = require('../models/status')
const SECRETKEY = "SuperSecretKey"

router.post('/register', async (req, res)=>{
  const {email, role,password, status} = req.body
  
  const isUser = await User.findOne({email})
  if (isUser) return res.status(401).send("The user already exist")
  
  const passwordH =  await bcrypt.hash(password, 8)  
  const newUser = new User({email, password:passwordH, role, status})
  await  newUser.save()
  res.status(200).send("User created!")
})

router.post('/signin',async (req,res)=>{
  const {email, password} = req.body
  
  const user = await User.findOne({email})
  if (!user) return res.status(401).send("The user doesn't exist")
  
  const areEquals = await bcrypt.compare(password, user.password)
  if (!areEquals) return res.status(401).send("Verify your data")

  if (user.status == STATUS.INACTIVE) return res.status(401).send("Contact your System Admin. Your account is inactive")

  console.log("Welcome!!! ",user)
  const token = jwt.sign({_id:user._id},SECRETKEY)
  res.status(200).send({token, role:user.role})
})

router.patch('/changestatus',async (req,res)=>{
  const {email, status} = req.body

  const filter = { email: email}
  const update = { status:status }

  const user = await User.findOne(filter)
  if (!user) return res.status(401).send("The user doesn't exist")
  
  await User.findOneAndUpdate(filter, update)
  res.status(200).send("User updated!")
})

router.get('/users', async(req,res)=>{
  const data = await User.find()
  if (!data) res.status(401).send("Failed to retreive the user list ") 
  res.status(200).send({data})
})




module.exports = router