/**
 * Created by Urs Forrer on 05.10.2016.
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: './data/note.db', autoload: true});

function publicAddNote(note, callback ) {
    db.insert(note , function (err, newNote) {
        callback(newNote);
    });
}

function publicUpdate(id, note, callback) {
    db.update({_id: id}, note, {}, function (err) {
        publicGet(id, callback)
    });
}

function publicGet(id, callback) {
    db.findOne({ _id: id}, function (err, note) {
        callback(err, note);
    });
}

function publicAll(sortItem, sortOrder, filter, callback) {
    // Change query depending on the value
    var query = (filter == true ? {finished: false} : {});

    db.find(query).sort({ [sortItem]: sortOrder }).exec(function (err, notes) {
        callback(err,notes);
    });
}

module.exports = {add : publicAddNote, get : publicGet, all : publicAll, update : publicUpdate};