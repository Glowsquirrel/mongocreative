var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true });

var commentSchema = mongoose.Schema({
    Type: String,
    Comment: String,
});

var scoreSchema = mongoose.Schema({
    Type: String,
    Up: Number,
    Down: Number,
});

var Comment = mongoose.model('Comment', commentSchema);
var Score = mongoose.model('Score', scoreSchema);

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

router.post('/vote', function(req, res, next) {
    console.log('post a vote');
    console.log(req.body);
    
    if (req.body.Vote == true) {
        console.log('true');
        Score.findOneAndUpdate({Type:req.body.Type}, {$inc: {Up : 1}}, function(err, data) {
            if (err) return console.error(err);
            else {
                console.log('upvoted!')
                res.sendStatus(200);
            }
        });
    }
    else if (req.body.Vote == false) {
        console.log('false');
        Score.findOneAndUpdate({Type:req.body.Type}, {$inc: {Down : 1}}, function(err, data) {
            if (err) return console.error(err);
            else {
                console.log('downvoted!')
                res.sendStatus(200);
            }
        });
    }
    
});

router.get('/vote', function(req, res, next) {
    console.log('get a vote');
    
    var type = req.query.Type;
    
    Score.find({Type:type}, function(err, data) {
        if (err) return console.error(err);
        else {
            res.json(data);
        }
    });
    
});

router.get('/delete', function(req, res, next) {
    console.log('delete');
    Comment.deleteMany({}, function(err) {
        if (err) return console.error(err);
        else {
            //res.json('All comments deleted');
        }
    });
    Score.deleteMany({}, function(err) {
        if (err) return console.error(err);
        else {
            //res.json('All comments deleted');
        }
    });
    var lens = new Score({Type: 'lensflare', Up: 0, Down: 0});
    var knuckles = new Score({Type: 'knuckles', Up: 0, Down: 0});
    var hitmarker = new Score({Type: 'hitmarker', Up: 0, Down: 0});
    var trap = new Score({Type: 'trap', Up: 0, Down: 0});
    
    lens.save(function(err, post) {
        if (err) return console.error(err);
    });
    knuckles.save(function(err, post) {
        if (err) return console.error(err);
    });
    hitmarker.save(function(err, post) {
        if (err) return console.error(err);
    });
    trap.save(function(err, post) {
        if (err) return console.error(err);
    });
    console.log('all comments deleted');
    res.json('All comments deleted');
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
