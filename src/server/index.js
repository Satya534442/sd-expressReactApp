const express = require("express");
const os = require("os");
const app = express();
var bodyParser = require("body-parser");
var cors = require('cors');


app.use(bodyParser());
app.use(cors());

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/my_db', { useNewUrlParser: true });
var personSchema = mongoose.Schema({
   username: String,
   password: String
});
var Person = mongoose.model("Person", personSchema);
app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.post("/api/person", function(req, res){
   var personInfo = req.body; //Get the parsed information
   console.log(req.params, req.query, req.body);
   if(!personInfo.username || !personInfo.password){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         username: personInfo.username,
         password: personInfo.password
      });
      newPerson.save()
       .then(item => {
       res.send("item saved to database");
       })
       .catch(err => {
       res.status(400).send("unable to save to database");
       });
      // newPerson.save(function(err, Person){
      //    if(err)
      //       res.render('show_message', {message: "Database error", type: "error"});
      //    else
      //       res.render('show_message', {
      //          message: "New person added", type: "success", person: personInfo});
      // });
   }
});

// app.use("/hello", (req, res) => {
//  res.sendFile("/Users/satyavan.dash/git/sd-expressReactApp/public/index.html");
// });

app.listen(8080, () => console.log("Listening on port 8080!"));
