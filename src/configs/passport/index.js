const { Strategy, ExtractJwt } = require('passport-jwt')
const mongoose = require('mongoose')
const User = require('../../app/models/User.js')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

module.exports = passport => {
  passport.use('auth',
    new Strategy(opts, async (payload, done) => {
      try {
        const user = await User.findById(payload.id)
        if(!user) { return done(null, false) }
        return done(null, {
          id: user.id,
          name: user.name
        })
      } catch(err) {
        return done(err, false)
      }
    })
  )
}
