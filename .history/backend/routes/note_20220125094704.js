const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Nodes');

//Route 3 Get loginedin User details using: PSOT "/api/auth/getUser". login required
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2 Add a new Note using: POST "/api/auth/addnote". login required
router.post(
    "/addnote", fetchuser,
    [
      body("title", "Enter a valid title").isLength({min : 3}),
      body('description', 'Description must be atleast 5 character').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const {title,description, tag} = req.body;
            // if there are errors, return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const saveNotes = await note.save()
            res.json(saveNotes)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
        
    })

module.exports = router