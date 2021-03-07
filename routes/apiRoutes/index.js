const router = require('express').Router();
const { addNote, findById } = require('../../lib/notes');
const notes = require('../../data/notes.json');
// used to assign random id to note
const {nanoid} = require('nanoid');

// read the notes.json file and return all saved notes as JSON
router.get('/notes', (req, res) => {
    res.json(notes);
});
  
// deletes a note
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      deleteNote(result, notes)
    } else {
      res.send(404);
    }
});

// receive a new note, add it to the notes.json file, and then return the new note to the client.
router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = nanoid();
  const note = addNote(req.body, notes);
  res.json(note);
});

module.exports = router;