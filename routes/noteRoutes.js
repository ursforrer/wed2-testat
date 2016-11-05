/**
 * Created by Urs Forrer on 05.10.2016.
 */
var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

// Route für Homeseite
router.get("/", notes.showIndex);

router.get("/notes/new", notes.newNode);
router.post("/notes", notes.createNote);
router.get("/notes/edit/:id", notes.editNode);
router.post("/notes/edit/:id", notes.update);

module.exports = router;