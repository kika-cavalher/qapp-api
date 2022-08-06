const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')


router.post('/create', ProjectController.create)

module.exports = router;