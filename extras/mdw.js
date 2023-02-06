const db = require('../db/query')
// const tools = require('./tools')

const mddwhome = (req, res, next) => {
    if (req.session.idUser) {
        if (req.url == '/login') {
            res.redirect('/panel')
        } else {
            next()
        }
    } else {
        if (req.url == '/login') {
            next()
        } else {
            res.redirect('/login')
        }
    }
}

let mdwIsMobile = (req, res, next) => {
    var ua = req.headers['user-agent'].toLowerCase(),
        $ = {};
    $.mobile = false;

    if (/mobile/i.test(ua))
        $.mobile = true;

    res.locals.mobile = $.mobile
    next()
}

const mddLoadData = async (req, res, next) => {
    try {
        let userData = (await db.users.getUserData(req.session.idUser))
        if (userData.data[0]) {
            res.locals.Admin = true;
        }
    } catch (err) {
        throw err
    }
    next();
}

module.exports =
{
    mddwhome,
    mddLoadData,
    mdwIsMobile,
}