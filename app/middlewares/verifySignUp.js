const db = require("../models");
const UserInfo = db.user;

checkDuplicateEmail = (req, res, next) => {
    //email
    UserInfo.findOne({
        username : req.body.username
        }).exec((err,user) => {
            if(err){
                res.status(500).send({message:err});
                return;
            }

            if(user){
                res.status(400).send({message:"Failed!Username already in use"});
                return;
            }

            next();
    });
};

const verifySignUp = {
    checkDuplicateEmail
};

module.exports = verifySignUp;