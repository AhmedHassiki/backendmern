const {body, validationResult} = require('express-validator');

const registerRules= () => [
    body('name', 'name is required').notEmpty(),
    body('lastName', 'lastName is required').notEmpty(),
    body('email', 'email should be email').isEmail(),
    body('password', 'password most contain at least 6 caracter').isLength({
        min: 6,
        max:30
    }),
];

const loginRules= () => [
    body('email', 'email should be email').isEmail(),
    body('password', 'password most contain at least 6 caracter').isLength({
        min: 6,
        max:30
    }),
];

// this is the validator
const validator = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()})
    }
    next()
}

module.exports = { validator, registerRules, loginRules}
