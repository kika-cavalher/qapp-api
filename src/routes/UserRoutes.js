const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.register)
router.post('/signin', UserController.login)
router.get('/checkuser', UserController.checkUser)

module.exports = router;