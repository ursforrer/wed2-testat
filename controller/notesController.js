/**
 * Created by Urs Forrer on 05.10.2016.
 */
var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res)
{
    var orderBy = req.query['orderBy'];
    var orderParameter;
    if (orderBy === undefined || orderBy === null) {
        // Falls nichts mitgegeben wurde, sollten die Werte so belassen werden.
        if (req.cookies.sortby === undefined || req.cookies.sortby === null) {
            // Initial, falls keine Cookies vorhanden sind.
            orderParameter = "duedate";
            res.cookie("sortby", orderParameter);
        }
        else {
            // Ansonsten vorherigen Cookieparameter auslesen
            orderParameter = req.cookies.sortby;
        }
    }
    else {
        // Werte setzen, wenn etwas über die Queryparameter mitgegeben wurde.
        res.cookie("sortby", orderBy);
        orderParameter = orderBy;
    }
    store.all(orderParameter, "1", "", function (err, notes) {
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


