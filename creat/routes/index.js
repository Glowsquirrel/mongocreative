var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true });

var commentSchema = mongoose.Schema({
    Type: String,
    Comment: String,
});

var Comment = mongoose.model('Comment', commentSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});

router.post('/comment', function(req, res, next) {
    console.log("POST comment route"); 
    console.log(req.body);
    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

router.get('/comment', function(req, res, next) {
    console.log("In the GET route");
    Comment.find(function(err, commentList) {
        if (err) return console.error(err);
        else {
            res.json(commentList);
        }
    });
});

router.get('/delete', function(req, res, next) {
    console.log('delete');
    Comment.deleteMany({}, function(err) {
        if (err) return console.error(err);
        else {
            res.json('All comments deleted');
        }
    });
});

router.get('/query', function(req, res, next) {
    console.log(req.query.Type);
    console.log("done");
    
    var type = req.query.Type;
    
    Comment.find({Type:type}, function(err, data) {
        if (err) return console.error(err);
        else {
            res.json(data);
        }
    });
});

module.exports = router;
