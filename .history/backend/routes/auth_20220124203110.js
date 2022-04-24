const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a user using: PSOT "/api/auth/". Doesn't require Auth
router.post('/',[
    body('name').isLength({ min: 3 }),
    body('username').isEmail(),
    body('password').isLength({ min: 6 }),
],(req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);

})

module.exports = router