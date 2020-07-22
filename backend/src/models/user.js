const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: String,
  hashedPassword: String
})

userSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10)
  this.hashedPassword = hash
}

userSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword)
  return result // true or false
}

userSchema.methods.serialize = function () {
  const data = this.toJSON()
  delete data.hashedPassword
  return data
}

userSchema.statics.findByUsername = async function (username) {
  const result = await this.findOne({ username }).exec()
  return result
}

module.exports = mongoose.model('User', userSchema)
