const {default:mongoose} = require('mongoose')

const URI= "mongodb+srv://danielrr:danielrr10@cluster0.0unnd4t.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URI).then(()=>{
  console.log("DB is connected")
}).catch(err=>console.log(err))


