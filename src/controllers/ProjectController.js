const Project = require('../models/Project');

module.exports = class ProjectController {

    static async create(req, res){
        res.json({msg: "Tudo ok!"})
    }
}