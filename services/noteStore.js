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
    this.state = "OK";
}

function publicAddNote(noteTitle, noteDescription, noteDueDate, noteImportance, callback ) {
    var note = new Note(noteTitle, noteDescription, noteDueDate, noteImportance);
    db.insert(note , function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, doc) {
        publicGet(id, callback);
    });
}

function publicGet(id, callback) {
    db.findOne({ _id: id}, function (err, doc) {
        callback(err, doc);
    });
}

function publicAll() {
    db.find({}, function (err, docs) {
        callback(err,docs);
    });
}

module.exports = {add : publicAddNote, delete : publicRemove, get : publicGet, all : publicAll};