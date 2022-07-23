const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.register)

module.exports = router;