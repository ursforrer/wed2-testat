/**
 * Created by Urs Forrer on 05.10.2016.
 */
var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res)
{
    store.all(function (err, notes) {
        if (err) {}
        res.render("index", {'notes' : notes});
    })
};

module.exports.newNode = function (req, res) {
    res.render("newNote");
};

module.exports.createNote = function (req, res) {
    var note = store.add(req.body.title, req.body.description, req.body.duedate, req.body.importane, function (err, note) {
        res.render("succeeded", note);
    })
};

module.exports.editNode = function (req, res) {
    store.get(req.params.id, function (err, note) {
        res.render("showNote", note);
    })
};


