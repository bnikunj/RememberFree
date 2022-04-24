const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcryipt = require('bcryptjs'); 
var jwt = require('jsonwebtoken');

//Create a user using: PSOT "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    // body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
], async (req,res) => {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    // check whether the user with this email exits already
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "sorry a user with this email already exits"})
    }
    const salt = await bcryipt.genSalt(10);
    const secPass = await bcryipt.hash(req.body.password, salt);
    //create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    // res.json(User)
    res.json(authToken);
    //catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");       
    }
})

module.exports = router