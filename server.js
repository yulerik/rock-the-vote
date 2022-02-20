const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const port = process.env.PORT || 9000
const uri = process.env.MONGODB_URI

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('connection thru mongodb')
  )

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) // req.user
app.use('/api/issue', require('./routes/issueRouter'))
app.use('/api/user', require('./routes/userRouter'))
app.use('/api/comments', require('./routes/commentRouter'))


app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})