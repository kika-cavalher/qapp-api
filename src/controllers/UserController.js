const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');

module.exports = class UserController {

    static async register(req, res){
        const { name, email, password, confirmPassword } = req.body

        if (!name) {
            return res.status(422).json({ msg: 'O nome deve ser obrigatório' })
        }
        if (!email) {
            return res.status(422).json({ msg: 'O e-mail deve ser obrigatório' })
        }
        if (!password) {
            return res.status(422).json({ msg: 'A senha deve ser obrigatório' })
        }
        if (!confirmPassword) {
            return res.status(422).json({ msg: 'A confirmação de senha deve ser obrigatório' })
        }
        if (password !== confirmPassword) {
            return res.status(422).json({ msg: 'A senha deve ser igual a informada' })
        }

        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ msg: 'Utilize outro e-mail, esse já existe no banco.' })
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        const user = new User({
            name,
            email,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)

        } catch (err) {
            res.status(500).json({ msg: err })
        }
    };

    static async login(req, res){
        const { email, password } = req.body
        if (!email) {
            return res.status(422).json({ msg: 'O e-mail deve ser obrigatório' })
        }
        if (!password) {
            return res.status(422).json({ msg: 'A senha deve ser obrigatório' })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(422).json({ msg: 'Esse user não existe no banco.' })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha inválida' })
        }
        await createUserToken(user, req, res)
    };

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'secret')

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined

        } else {
            currentUser = null
        }
        res.status(200).send(currentUser)
    };

    static async getUserById(req, res){
       const id = req.params.id
       const user = await User.findById(id).select("-password")

       if(!user){
        res.status(422).json({ msg: 'User não encontrado' })
        return 
       }
        res.status(200).json({ user })
    };
}