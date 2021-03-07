const router = require('express').Router();
const { addNote, findById } = require('../../lib/notes');
const notes = require('../../data/notes.json');
const {nanoid} = require('nanoid');


// GET /api/notes -- should read the notes.json file and return all saved notes as JSON
router.get('/notes', (req, res) => {
    res.json(notes);
});
  
// returns a specific note
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

// POST /api/notes -- should receive a new note to save on the request body, add it to the notes.json file, and then return the new note to the client.
router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = nanoid();
  const note = addNote(req.body, notes);
  res.json(note);
});

module.exports = router;