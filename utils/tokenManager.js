
var jwt = require('jsonwebtoken')
const generateToken = (uid , em) => {
    const expiresIn = 60 * 15
    try {
        const token = jwt.sign({uid , em} , process.env.JWT_SECRET , {expiresIn})
        return {token , expiresIn}
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    generateToken,
}