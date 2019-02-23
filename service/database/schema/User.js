const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// 创建我们的用户Schema
const userSchema = new Schema({
  UserId: {type: ObjectId},
  userName: {unique: true, type: String},
  passWord: String,
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
}, {
  collection: 'user'
})

userSchema.pre('save', function (next) {
  // console.log(this)
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
    if (err) return next(err)
    bcrypt.hash(this.passWord, salt, (err, hash)=> {
      if (err) return next(err)
      this.passWord = hash
      next()
    })
  })
})

userSchema.methods = {
  // 密码比对
  comparePassword: (_password, passWord) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, passWord, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

// 发布模型
mongoose.model('User', userSchema)