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
                    msg: 'Projeto criado com sucesso'
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

    static async removeProjectById(req, res) {
        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            return res.status(422).json({ msg: 'Id inválido' })
        }

        const project = await Project.findOne({'_id': id})
        if(!project){
            res.status(404).json({ msg: 'Projeto não encontrado.' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(project.user._id.toString() !== user._id.toString()){
            res.status(422).json({ msg: 'O user não tem acesso a esse projeto.' })
            return
        }

        await Project.findByIdAndRemove(id)
        res.status(200).json(
            {
                msg: 'Projeto excluído com sucesso.'
            })

    }

    static async updateProject(req, res) {
        const id = req.params.id
        const { name, content, describe } = req.body

        const updatedData = {}

        const project = await Project.findOne({'_id': id})
        if(!project){
            res.status(404).json({ msg: 'Projeto não encontrado.' })
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(project.user._id.toString() !== user._id.toString()){
            res.status(422).json({ msg: 'O user não tem acesso a esse projeto.' })
            return
        }

        if (!name) {
            return res.status(422).json({ msg: 'O nome deve ser obrigatório' })
        } else {
            updatedData.name = name
        }
        if (content) {
            updatedData.content = content
        }
        if (!describe) {
            return res.status(422).json({ msg: 'A descrição deve ser obrigatória' })
        } else {
            updatedData.describe = describe
        }

        await Project.findByIdAndUpdate(id, updatedData)
        res.status(200).json(
            {
                mgg: 'Projeto atualizado com sucesso.',
                project
            })

    }

}