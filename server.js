const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
    orign: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

const db = require("./app/models");
const userInfo = db.user;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch(err =>{
        console.error("Connection error",err);
        process.exit();
    });

 
// simple route
app.get("/",(req,res) => {
    res.json({message:"Let's play rock paper scissor"});
});

require('./app/routes/auth.routes')(app);

//require('./app/routes/user.routes')(app);


//set port ,listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server is running on the port ${PORT}.`);
});