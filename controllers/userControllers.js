const User = require('../model/User'); // model imported
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../.env'})


exports.registerUser = async (req, res) => {
    try { // validation coz all these are required
        /**
         * ! this validation is replaced by the express validator middleware
         */
        const {name, lastName, email, password} = req.body;
        // if (!name || !lastName || !email || !password){
        //     return res.status(400).send('Please enter all fields ... !')
        // };
        // validation if email is unique ((User.findOne : this User is our model))
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json('Email already exists')
        };

        // Create new model
        user = new User({name, lastName, email, password}); 

        /**
         * ! encrypt password: create salt and hash : before the SAVE method
         */
        const salt = 10;
        const hashedpassword = await bcrypt.hash(password, salt);
        user.password = hashedpassword;
        // Save user
        await user.save();
        /**
         * ! Sign user (before the return)
         */
        const payload = {
            id : user._id
        };
        const token = await jwt.sign(payload, process.env.SECRET_KEY);
        // const token = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"1h"});

        return res.status(200).send({msg:'User registered successfully', user , token});
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:'Cannot register', error})
    }
}



exports.loginUser = async (req, res) => {
    try { // validation coz all these are required
        /**
         * ! this validation is replaced by the express validator middleware
         */
        const {email, password} = req.body;
        // if (!email || !password){
        //     return res.status(400).send('Please enter all fields ... !')
        // };
        // validation if email is unique ((User.findOne : this User is our model))
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({msg : "User doesn't exist"})
        };
        /**
         * ! Create salt and compare
         */
        const match = await bcrypt.compare(password, user.password);
        // console.log(match)
        if (!match){
            return res.status(400).json('Credentials Password incorrect')
        }
        /**
         * ! Sign user (before the return)
         */
        const payload = {
            id : user._id
        };
        const token = await jwt.sign(payload, process.env.SECRET_KEY);
        // const token = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"1h"});
        return res.status(200).send({msg:'User login successfully', user, token});
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:'Cannot login', error})
    }
}
