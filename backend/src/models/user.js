const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫번째 인자에 토큰 안에 집어넣고 싶은 데이터 전달
    {
      _id: this._id,
      username: this.username
    },
    process.env.JWT_SECRET, // 두번째 인자에 JWT 암호 전달
    {
      expiresIn: '7d' // 7일동안 유효
    }
  )
  return token
}

userSchema.statics.findByUsername = async function (username) {
  const result = await this.findOne({ username }).exec()
  return result
}

module.exports = mongoose.model('User', userSchema)
