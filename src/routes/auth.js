const router = require('express').Router()
const AuthController = require('../app/controllers/AuthController.js')
const passport = require('passport')
/* const auth = require('../app/middlewares/auth') */

/* router.get('/', [ auth ], AuthController.show) */
router.get('/', passport.authenticate('auth', { session: false }), AuthController.show)

router.post('/register', AuthController.store)
router.post('/login', AuthController.login)

module.exports = router
