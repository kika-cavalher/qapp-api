const jwt = require('jsonwebtoken')

function createUserToken(user, req, res) {
        
    const token = jwt.sign(
        {
            name: user.name,
            id: user._id,
        }, "secret", )

    res.status(200).json({
        msg: "Você está autenticado",
        token: token,
        userId: user._id
    })
}

module.exports = createUserToken;