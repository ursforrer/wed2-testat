/**
 * Created by Urs Forrer on 05.10.2016.
 */
var store = require("../services/noteStore.js");

function initalConfig(res, parameters) {
    res.cookie("style", parameters[0]);
    res.cookie("filter", parameters[1]);
    res.cookie("sortby", parameters[2]);
    res.cookie("sort", parameters[3]);
}

module.exports.showIndex = function(req, res)
{
    var orderBy = req.query['orderBy'];
    var apperance = req.query['style'];
    var filter = req.query['filter'];
    var parameters = [];

    // Inital Config
    if (req.cookies.style === undefined && req.cookies.sortby === undefined && req.cookies.filter === undefined && req.cookies.sort === undefined) {
        parameters = ["light", "false", "duedate", "1"];
        initalConfig(res,parameters);
    }
    // Case if not inital
    else {
        parameters[0] = (apperance === undefined ? req.cookies.style : apperance);
        res.cookie("style", parameters[0]);

        parameters[1] = (filter === undefined ? req.cookies.filter : filter);
        res.cookie("filter", parameters[1]);

        parameters[2] = (orderBy === undefined ? req.cookies.sortby : orderBy);
        res.cookie("sortby", parameters[2]);

        if (orderBy == req.cookies.sortby) {
            parameters[3] = (req.cookies.sort == "-1" ? "1" : "-1")
        }
        else {
            parameters[3] = "1";
        }
        res.cookie("sort", parameters[3]);
    }

    // To Convert the Data from string to boolean (output from session is boolean)
    var filterForRender = parameters[1] != "false";

    // Invert for the correct value
    var styleForRender = (parameters[0] == "light" ? "dark" : "light");

    store.all(parameters[2], parameters[3], filterForRender, function (err, notes) {
        res.render("index", {'notes' : notes, 'style' : styleForRender, 'css' : parameters[0], 'filter' : filterForRender, 'headtitle' : "Node Pro - List"});
    })
};

module.exports.newNode = function (req, res) {
    // Get the form for the new note
    res.render("newNote", { 'css' : req.cookies.style, 'headtitle' : "Node Pro - New Node"});
};

module.exports.createNote = function (req, res) {
    // Set default values
    var newNote = req.body;
    newNote.createdate = Date.now();
    newNote.finished = false;
    // Add note to the database
    store.add(newNote, function (err, note) {
        res.redirect("/");
    })
};

module.exports.editNode = function (req, res) {
    // Get informations about the note from the database
    store.get(req.params.id, function (err, note) {
        res.render("editNote", { 'css' : req.cookies.style, 'note' : note, 'headtitle' : "Node Pro - Edit Node"});
    })
};

module.exports.update = function (req, res) {
    var editNote = req.body;
    // To set, true or false to the database
    editNote.finished = editNote.finished !== undefined;
    // Update in the database
    store.update(req.params.id, editNote, function (err, note) {
        res.redirect("/");
    });
};


