/**
 * Created by Urs Forrer on 05.10.2016.
 */
var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res)
{
    var orderBy = req.query['orderBy'];
    var apperance = req.query['style'];
    var filter = req.query['filter'];
    var orderParameter;
    var orderParameterTwo;
    var styleParameter;
    var filterParameter;
    var sort;

    // Behandlung des Style Parameters
    if (apperance === undefined || apperance === null) {
        // Initale Seztung der Werte, falls nichts anderes angegben ist.
        if (req.cookies.style === undefined || req.cookies.style === null) {
            styleParameter = "light";
            res.cookie("style", styleParameter);
        }
        else {
            // Falls nichts übermittelt wurde, aber bereits etwas gesetzt ist, wird dies übergeben
            styleParameter = req.cookies.style;
        }
    }
    else {
        // Parameter so setzen, wie es in der Query angegeben ist.
        styleParameter = apperance;
        res.cookie("style", styleParameter);
    }

    // Behandlung des Filter Parameters
    if (filter === undefined || filter === null) {
        // Initale Seztung der Werte, falls nichts anderes angegben ist.
        if (req.cookies.filter === undefined || req.cookies.filter === null) {
            filterParameter = false;
            res.cookie("filter", filterParameter);
        }
        else {
            // Falls nichts übermittelt wurde, aber bereits etwas gesetzt ist, wird dies übergeben
            filterParameter = req.cookies.filter;
        }
    }
    else {
        // Paramter so setzen, wie es in der Query angegeben ist.
        filterParameter = filter;
        res.cookie("filter", filterParameter);
    }

    // Behandlung des Order Parameters
    if (orderBy === undefined || orderBy === null) {
        // Falls nichts mitgegeben wurde, sollten die Werte so belassen werden.
        if (req.cookies.sortby === undefined || req.cookies.sortby === null) {
            // Initial, falls keine Cookies vorhanden sind.
            orderParameter = "duedate";
            orderParameterTwo = "1";
            res.cookie("sortby", orderParameter);
            res.cookie("sort", orderParameterTwo);
        }
        else {
            // Ansonsten vorherigen Cookieparameter auslesen
            orderParameter = req.cookies.sortby;
            orderParameterTwo = req.cookies.sort;
        }
    }
    else {
        // Werte setzen, wenn etwas über die Queryparameter mitgegeben wurde.
        res.cookie("sortby", orderBy);
        if (orderBy == req.cookies.sortby) {
            if (req.cookies.sort == "-1") {
                orderParameterTwo = "1";
            }
            else {
                orderParameterTwo = "-1";
            }
        }
        else {
            orderParameterTwo = "1";
        }
        res.cookie("sort", orderParameterTwo);
        orderParameter = orderBy;
    }

    // Workaround, da aus der Session der Stirngwert gelesen wird und nicht der Booleanwert
    if (filterParameter == "false") {
        filterParameter = false;
    }
    else if (filterParameter == "true") {
        filterParameter = true;
    }

    var styleForRender = (styleParameter == "light" ? "dark" : "light");

    store.all(orderParameter, orderParameterTwo, filterParameter, function (err, notes) {
        res.render("index", {'notes' : notes, 'style' : styleForRender, 'css' : styleParameter, 'filter' : filterParameter, 'headtitle' : "Node Pro - List"});
    })
};

module.exports.newNode = function (req, res) {
    res.render("newNote", { 'css' : req.cookies.style, 'headtitle' : "Node Pro - New Node"});
};

module.exports.createNote = function (req, res) {
    var newNote = req.body;
    newNote.createdate = Date.now();
    newNote.finished = false;
    store.add(newNote, function (err, note) {
        res.redirect("/");
    })
};

module.exports.editNode = function (req, res) {
    store.get(req.params.id, function (err, note) {
        res.render("editNote", { 'css' : req.cookies.style, 'note' : note, 'headtitle' : "Node Pro - Edit Node"});
    })
};

module.exports.update = function (req, res) {
    var editNote = req.body;
    console.log(editNote.finished);
    if (editNote.finished == "on") {
        console.log("on");
        editNote.finished = true;
        console.log(editNote.finished);
    } else {
        console.log("off");
        editNote.finished = false;
        console.log(editNote.finished);
    }
    store.update(req.params.id, editNote, function (err, note) {
        res.redirect("/");
    });
};


