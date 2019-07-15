const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    select: false,
    max: 1024,
    min: 6
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
})

module.exports = mongoose.model('User', userSchema)
