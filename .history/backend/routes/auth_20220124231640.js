const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a user using: PSOT "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 6 character').isLength({ min: 6 }),
], async (req,res)=>{
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with this email exits already
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error: "sorry a user with this email already exits"})
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})

})

module.exports = router