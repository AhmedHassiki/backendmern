const express = require('express');
const router = express.Router();
//import controllers
const controllers = require('../controllers/userControllers');
const { validator, registerRules, loginRules } = require('../middleware/validator');
const isAuth = require('../middleware/IsAuth');

router.post('/register', registerRules(), validator, controllers.registerUser);
router.post('/login', loginRules(), validator, controllers.loginUser);
router.get('/', isAuth, (req, res)=>{
    return res.status(200).send({user:req.user})
})


module.exports = router;