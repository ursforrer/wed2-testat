/**
 * Created by Urs Forrer on 05.10.2016.
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: './data/note.db', autoload: true});

function Note(noteTitle, noteDescription, noteDueDate, noteImportance) {
    this.note = noteTitle;
    this.description = noteDescription;
    this.duedate = noteDueDate;
    this.importane = noteImportance;
    this.finished = false;
}