const User = require("../models/User");

async function accountExists(req, res, next) {
    const user = await User.findOne({
        email: req.body.email
    })

    if (user) {
        return next()
    }

    return res.status(404).json({
        success: false,
        message: "User doesn't exists, please sign up"
    })
}

function accountHasBeenVerified(req, res, next) {
    if (req.user.verified) {
        return next()
    }

    return res.status(401).json({
        success: false,
        message: 'Please, verify your email account and try again'
    })
}

module.exports = {
    accountExists,
    accountHasBeenVerified
}
