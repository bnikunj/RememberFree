const express = require('express');
const router = express.Router();
const User = require('../models/User');


//Create a user using: PSOT "/api/auth/". Doesn't require Auth
router.get('/',(req,res)=>{
    console.log(req.body);
    User.save()
    res.send(req.body);

})

module.exports = router