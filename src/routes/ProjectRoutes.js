const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')

const verifyToken = require('../helpers/verify-token')


router.get('/allProjects', ProjectController.allProjects)
router.post('/create', verifyToken, ProjectController.create)
router.get('/', verifyToken, ProjectController.getAllUserProjects)
router.get('/:id', verifyToken, ProjectController.getPetById)
router.delete('/:id', verifyToken, ProjectController.removeProjectById)



module.exports = router;