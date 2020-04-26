var express = require('express');
var firebase = require('firebase-admin');
var router = express.Router();

var ServiceAccount = require('../database.json');


//Initialization
firebase.initializeApp({
    credential: firebase.credential.cert(ServiceAccount),
    databaseURL: "https://databaseproj-5080c.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref('students');

ref.once("value", function(snapshot){
    console.log(snapshot.val());
});

//Get data from base
router.get('/', function(req, res, next) {
    ref.once("value", function(snapshot){
        var result = snapshot.val();
        res.render('database', { title: 'Firebase', 'testObj' : result});
    })
  });

router.post("/add", (req, res) => {
  var qty;
  ref.once("value", function (snapshot) {
      qty = Object.keys(snapshot.val()).length + 1;
      console.log(qty);
      studentref = ref.child('student' + qty);
      let data = ({
          name: req.body.name,
          age: req.body.age,
          gender: req.body.gender,
      });
      studentref.set(data).then(resq => {
          res.redirect('/database');
      })
      .catch(error => console.error(error))
  });
});

module.exports = router;