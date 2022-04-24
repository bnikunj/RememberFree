const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Nodes');

//Route 3 Get loginedin User details using: PSOT "/api/auth/getUser". login required
router.get('/fetchallnotes',(req,res)=>{
    const notes = await Notes.find({user: req.user.id});
    res.json(notes)
})

module.exports = router