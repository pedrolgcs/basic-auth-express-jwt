const router = require('express').Router()
const AuthController = require('../app/controllers/AuthController.js')
const auth = require('../app/middlewares/auth')

router.get('/', [ auth ], AuthController.show)

router.post('/register', AuthController.store)
router.post('/login', AuthController.login)

module.exports = router
