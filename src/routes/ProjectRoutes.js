const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')

const verifyToken = require('../helpers/verify-token')


router.post('/create', verifyToken, ProjectController.create)
router.get('/allProjects', ProjectController.allProjects)



module.exports = router;