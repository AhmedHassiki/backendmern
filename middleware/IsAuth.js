const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../.env'});
const User = require('../model/User');

/**
 * ! A middleware takes by default req, res, next
 * ? Every function related with database should be asynchronous
 *  */
const isAuth = async(req, res, next) => {
    try {
        // we send the token with the x-auth-token in the header not the body to verify if the token is correct or not
        // Get token from headers
        const token = req.headers['x-auth-token']      
            // Check if token exists
            if (!token){//means if we don't have a token, or the token is incorrect or the token lacks the secret_key
                return res.status(400).send({msg:"No token authorized"})// this msg will be shown
            };// else it will decode et work with the token
            const decode = await jwt.verify(token, process.env.SECRET_KEY);
            //it verify the token with its secret_key if it's correct or not.
            // Get user by ID from payload *id=(user._id)*
            const user = await User.findById(decode.id);
            if (!user){// if we didn't find a user
                return res.status(400).send({msg:"Unauthorized"});
            };// else if the user exists:
            req.user = user;
            // console.log("req.user", req.user)
            next();
    } catch (error) {
        res.status(500).send({msg:"Token not valid"})        
    };
}

module.exports = isAuth;
