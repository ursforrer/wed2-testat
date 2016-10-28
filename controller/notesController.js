/**
 * Created by Urs Forrer on 05.10.2016.
 */
var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res)
{
    res.render("index");
};

module.exports.createNote = function (req, res) {
    res.render("newNote");
}

module.exports.showNode = function (req, res) {
    store.get(req.params.id, function (err, note) {
        res.render("showNote", note);
    })
}

