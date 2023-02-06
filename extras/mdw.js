const db = require('../db/query')
// const tools = require('./tools')

const mddwhome = (req,res,next)=>
{
    if(!req.session.idUser) {
        res.redirect('/login')
    } else {
        if(req.url == '/login') {
            res.redirect('/panel')
        } else {
            next()
        }
    }
}

let mdwIsMobile = (req, res, next) => {
    var ua = req.headers['user-agent'].toLowerCase(),
    $ = {};
    $.mobile = false;
 
    if(/mobile/i.test(ua))
       $.mobile = true;
 
    res.locals.mobile = $.mobile
    next()
 }
 
// const mddValidation = (req,res,next) =>
// {
//    if(req.session.tempID == -1 || req.session.tempID == undefined)
//    {
//       res.redirect('/');
//    }
//    else
//    {
//       next();
//    }
// }

// const mddLoadData = async (req, res, next) => {
//    try {
//       let userData = (await db.users.getUserData(req.session.userID))
//       if(userData.data[0]){
//          res.locals.Id = req.session.userID
//          res.locals.Name = userData.data[0].NOMBRES_US
//          res.locals.LastName = userData.data[0].APELLIDOS_US
//          res.locals.Email = userData.data[0].CORREO_US
//          res.locals.Gender = userData.data[0].GENERO_US
//          res.locals.Role = userData.data[0].ROL_US
//          res.locals.urlSeccion = req.url
//          // let sections = (await db.sections.load()).data
//          let perms = (await db.users.getPermissions(req.session.userID)).data
//          res.locals.sections = tools.sections.structure(perms)
//       }
//       else {
//          req.session.destroy(function(err){
//             if(err){
//                console.log(err);
//             }else{
//                res.redirect('/');
//             }
//          });
//       }
//    } catch (err) {
//       throw err
//    }
   
//    next();
// }

module.exports = 
{
    mddwhome,
    mdwIsMobile,
}