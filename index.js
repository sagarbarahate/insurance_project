var express = require("express");
var bodyparser = require("body-parser");
var session = require("express-session");
var upload = require("express-fileupload");
var adminroute = require("./routes/admin");
var userroute = require("./routes/user");
var app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(session({
    secret:"asfdfggrrbdfghghgnhggh",
    resave:true,
    saveUninitialized:true
}));
app.use(express.static("public/"));

app.use("/",userroute);
app.use("/admin",adminroute);


app.listen(1000);