const router = require('express').Router()
const UserController = require('../controllers/UserController')

const verifyToken = require('../helpers/verify-token')

router.post('/signup', UserController.register)
router.post('/signin', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, UserController.editUser)

module.exports = router;