var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// GET Mongo DB 
router.get("/", function(req, res) {

  console.log("Erik Note: GET is working.");
  var myMongoDB;
  var cursor = [];

  // mongodb://erikisaac:Yellow1972!@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false
  // mongodb://<dbuser>:<dbpassword>@ds037205.mlab.com:37205/heroku_r18r5gzd
  // mongodb://<dbuser>:<dbpassword>@ds155674.mlab.com:55674/heroku_3zgk6kbj
  mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb:Yellow1972!//heroku_r18r5gzd:@ds155674.mlab.com:55674/heroku_3zgk6kbj", function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    };

    myMongoDB = client.db("heroku_r18r5gzd");
    var cursor = myMongoDB.collection('erikcollection').find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        res.status(200).json(docs);
      }
    });
  });
});

// POST Mongo DB
router.post("/", function(req, res) {
  
  console.log("Erik Note: POST is working.");

  var newData = req.body;
  console.log(newData);

  mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb:Yellow1972!//heroku_r18r5gzd:@ds155674.mlab.com:55674/heroku_3zgk6kbj", function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    };

    myMongoDB = client.db("heroku_r18r5gzd");  
    var cursor = myMongoDB.collection('erikcollection').insertOne(newData, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to add new data.");
      } else {
        res.status(201).json(doc);
      }
    });

  });
});

// DELETE Mongo DB
router.delete("/:id", function(req, res) {
  
  console.log("Erik Note: DELETE is working.");

  var ObjectID = mongodb.ObjectID;
  
  // var deleteData = {}; 
  // deleteData = req.body;

  console.log("Erik Note: Var check: " + req.params.id + " " + JSON.stringify(req.params.id));

  mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb:Yellow1972!//heroku_r18r5gzd:@ds155674.mlab.com:55674/heroku_3zgk6kbj", function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    };

    myMongoDB = client.db("heroku_r18r5gzd");  
    myMongoDB.collection('erikcollection').deleteOne({_id: new ObjectID(req.params.id)}, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact");
      } else {
        res.status(200).json(new ObjectID(req.params.id));
      }
    });

    console.log("Erik Note: Var check: " + req.params.id + " " + JSON.stringify(req.params.id) + " " + new ObjectID(req.params.id));

  });

});

module.exports = router;