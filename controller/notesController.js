/**
 * Created by Urs Forrer on 05.10.2016.
 */
var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res)
{
    var order = req.query['orderBy'];
    console.log(order);
    // Default Sortierung, wenn nicht anderes angegeben ist.
    if (order === undefined || order === null) {
        order = "duedate";
    }
    store.all(order, "1", function (err, notes) {
        if (err) {}
        res.render("index", {'notes' : notes});
    })
};

module.exports.newNode = function (req, res) {
    res.render("newNote");
};

module.exports.createNote = function (req, res) {
    var newNote = req.body;
    newNote.createdate = Date.now();
    newNote.finished = false;
    store.add(newNote, function (err, note) {
        res.render("succeeded", note);
    })
};

module.exports.editNode = function (req, res) {
    store.get(req.params.id, function (err, note) {
        res.render("editNote", note);
    })
};

module.exports.update = function (req, res) {
    store.update(req.params.id, req.body, function (err, note) {
        res.redirect("/");
    });
};


