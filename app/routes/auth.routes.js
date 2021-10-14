const {verifySignUp} = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //api for sign up

    app.post("/api/auth/signup",
            [verifySignUp.checkDuplicateEmail],
            controller.signup

    );

    //api for sign in
    app.post("/api/auth/signin",controller.signin);

    //api for testing purpose to see info of all users
    app.get("/api/test/all", controller.getAllUsers);

    //api to update the user score
    app.put("/api/updateScore",controller.updateScore);

    //api to get user info via JWT
    app.get("/api/user",[authJwt.verifyToken], controller.userInformation);


};