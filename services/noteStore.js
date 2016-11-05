/**
 * Created by Urs Forrer on 05.10.2016.
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: './data/note.db', autoload: true});

function Note(noteTitle, noteDescription, noteDueDate, noteImportance) {
    this.title = noteTitle;
    this.description = noteDescription;
    this.duedate = noteDueDate;
    this.importane = noteImportance;
    this.finished = false;
    this.state = "OK";
}

function publicAddNote(noteTitle, noteDescription, noteDueDate, noteImportance, callback ) {
    var note = new Note(noteTitle, noteDescription, noteDueDate, noteImportance);
    db.insert(note , function (err, newNote) {
        if (callback) {
            callback(err, newNote);
        }
    });
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, note) {
        publicGet(id, callback);
    });
}

function publicGet(id, callback) {
    db.findOne({ _id: id}, function (err, note) {
        callback(err, note);
    });
}

function publicAll(callback) {
    db.find({}, function (err, notes) {
        callback(err,notes);
    });
}

module.exports = {add : publicAddNote, delete : publicRemove, get : publicGet, all : publicAll};