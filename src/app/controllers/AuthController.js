const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const validation = require('../../configs/joi/auth')

module.exports = {
  async store(req, res) {
    const { error, value } = validation.user(
      { name, email, password } = req.body
    )
    if (error) return res.status(400).send(error)
    try {
      const user = await User.create(value)
      user.password = undefined
      return res.status(200).json({
        user, token: user.generateToken(user.id)
      })
    } catch (err) {
      return res.status(400).send(err)
    }
  },
  async login(req, res) {
    const { email, password } = req.body
    const { error, value } = validation.login({ email, password })
    if (error) return res.status(400).send(error)
    try {
      const user = await User.findOne({ email }).select('+password')
      // verifications
      if (!user) {
        return res.status(404).json({ error: 'e-mail not exist' })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: 'Invalid password'})
      }
      // set password to undefined for return
      user.password = undefined
      return res.status(200).json({
        user, token: user.generateToken(user.id)
      })
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async show(req, res) {
    const user = await User.findById(req.userId)
    return res.status(200).json(user)
  }
}

