const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Nodes');

//Route 3 Get loginedin User details using: PSOT "/api/auth/getUser". login required
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    const notes = await Notes.find({user: req.user.id});
    res.json(notes)
})

//Route 2 Authenticate a User using: PSOT "/api/auth/login". No login required
router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
      // if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

module.exports = router