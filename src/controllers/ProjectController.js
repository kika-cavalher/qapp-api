const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const Project = require('../models/Project');
const ObjectId = require('mongoose').Types.ObjectId

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

    static async allProjects(req, res) {
        const projects = await Project.find().sort('-createdAt')
        res.status(200).json(
            {
                projects: projects
            })
    }

    static async getAllUserProjects(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const projects = await Project.find({'user._id': user._id}).sort('-createdAt')
        res.status(200).json(
            {
                projects
            })
    }


    static async getPetById(req, res) {
        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            return res.status(422).json({ msg: 'Id inválido' })
        }

        const project = await Project.findOne({'_id': id})
        if(!project){
            res.status(404).json({ msg: 'Projeto não encontrado.' })
        }

        res.status(200).json(
            {
                project: project
            })

    }

    static async cre888ate(req, res) {}

    static async cre888ate(req, res) {}
}