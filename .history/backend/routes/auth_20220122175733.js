const express = require('express');
const User = require('../models/User');
const router = express.Router();


//Create a user using: PSOT "/api/auth/". Doesn't require Auth
router.get('/',(req,res)=>{
    console.log(req.body);
    User.save()
    res.send(req.body);

})

module.exports = router