const express = require("express");
const cors =  require("cors");
const app = express()
const PORT= 3000
require('./database')

app.use(cors())
app.use(express.json())

app.use('/api', require('./routes/index'))

app.listen(PORT)
console.log("Server running on port",PORT)
