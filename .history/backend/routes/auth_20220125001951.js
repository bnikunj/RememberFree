const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a user using: PSOT "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 character').isLength({ min: 5 }),
], async (req,res)=>{
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
    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json(User)
    //catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");       
    }
})

module.exports = router