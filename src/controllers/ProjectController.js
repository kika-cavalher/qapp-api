const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const Project = require('../models/Project');

module.exports = class ProjectController {

    static async create(req, res) {
        const { name, content, describe } = req.body

        if (!name) {
            return res.status(422).json({ msg: 'O nome deve ser obrigatório' })
        }
        if (!content) {
            return res.status(422).json({ msg: 'A abreviação deve ser obrigatório' })
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const project = new Project({
            name,
            content,
            describe,
            user: {
                _id: user._id,
                name: user.name,
                avatar: user.image
            }
        })

        try {
            const newProject = await project.save()
            res.status(201).json(
                {
                    msg: 'Projet create',
                    newProject
                })

        } catch (error) {
            res.status(500).json({ msg: error })
        }

    }
}