const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

// pre-save hook to encrypt user passwords on signup
userSchema.pre('save', function(next) {
  const user = this
  if(!user.isModified('password')) return next()
  bcrypt.hash(user.password, 10, (err, hashedpassword) => {
    if (err) return next(err)
    user.password = hashedpassword
    next()
  })
})

// method to cehck encrypted password on login
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (err) callback(err)
    return callback(null, isMatch)
  })
}
// method to remove user's password for token/sending response
userSchema.methods.withoutPassword = function() {
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model("User", userSchema)