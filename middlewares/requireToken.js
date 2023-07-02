
var jwt = require('jsonwebtoken')

const requireToken = (req , res , next) => {
    try {
        let token = req.headers?.authorization
        console.log(token)
        if(!token) throw new Error('No esiste token en le header usa Bearer')
        token = token.split(" ")[1]
        const {uid} = jwt.verify(token , process.env.JWT_SECRET)
        
        req.uid = uid
        console.log(uid)
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({error: error.message})
    }
}

module.exports = {
    requireToken,


}