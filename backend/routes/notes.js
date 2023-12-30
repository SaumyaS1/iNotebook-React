const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { check, validationResult } = require('express-validator');

// Route fecth all notes                     --request get:http://localhost/api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    // Fetch all notes for the user from the database
    const notes = await Notes.find({ user: req.user.id });

    // Return the notes in the response
    res.json(notes);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// __________________________________________________________________________________________________________________________
// add a new note for the logged-in user             --request post:http://localhost/api/notes/addnote

router.post(
  '/addnote',
  fetchuser,
  [
    // Validation middleware
    check("title", "enter the title"),
    check("description", "Description is required").notEmpty().isLength({ min: 4 }),
    check("tag", "Tag should be a string").optional().isString(),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new note instance
      const note = new Notes({
        user: req.user.id, // Assign the logged-in user's ID to the 'user' field
        title,
        description,
        tag,
        date: new Date(),
      });

      // Save the new note to the database
      const savedNote = await note.save();

      // Return the saved note in the response
      res.json(savedNote);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ___________________________________________________________________________________________________________________
// Update an existing Note     --request put:http://localhost/api/notes/updatenote/:id

router.put(
  '/updatenote/:id', // Use the note's _id as a parameter
  fetchuser, async (req, res) => {
    try {
      const { title, description, tag } = req.body;
         
      // Update the note fields  
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      // Find the note by its _id and user
      const note = await Notes.findById(req.params.id);

      // Check if the note exists
      if (!note) {
        console.log('Note not found. Note ID:', req.params.id);
        return res.status(404).json({ error: 'Note2 not found' });
      }

      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed to update this note");
      }

      const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
      res.json({updatedNote});

    } catch (error) {
      // Handle errors
      console.error('Error updating note:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);


// ____________________________________________________________________________________________________________________________________
// Delete an existing Note     --request DELETE:http://localhost/api/notes/deletenote/:id

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted by its _id and user
    let note = await Notes.findById(req.params.id);

    // Check if the note exists
    if (!note) {
      return res.status(404).json({ error: 'Note1 not found' });
    }

    // Check if the logged-in user is the owner of the note
    if (note.user.toString() !== req.user.id) {
      console.log('Ownership check failed.');
      return res.status(401).send('Not Allowed');
    }

    // Delete the note from the database
    // await note.remove();
    note = await Notes.findByIdAndDelete(req.params.id)

    // Return a success message in the response
    res.json({ message: 'Note deleted successfully', note: note });
  } catch (error) {
    // Handle errors
    console.error( error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
