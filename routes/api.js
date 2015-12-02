var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

function isAuthenticated(req, res, next) {
  if(req.method === "GET"){
    return next();
  }
  if(req.isAuthenticated()){
    return next();
  }
  //if the user is not authenticated, redirect them to the login page
  return res.redirect('/#login');
};

router.use('/posts', isAuthenticated);

router.route('/posts')
   // create a new post
  .post(function(req, res) {
    if(!req.isAuthenticated()){
      return res.send(401, {message: "You are not authorized to post please log in or signup first."})
    }
    var post = new Post();
    post.text = req.body.text;
    post.username = req.body.created_by;
    post.save(function(err, post) {
      if(err){
        return res.send(500, err);
      }
      return res.json(post);
    });
  })
  .get(function(req, res) {

    Post.find(function(err, posts) {
      if(err){
        return res.send(500, err);
      }
      return res.send(200, posts);
    });
  })

router.route('/posts/:id')
  //update existing post
  .get(function(req, res){
    Post.findById(req.params.id, function(err, post){
      if(err)
        res.send(err);
      res.json(post);
    });
  })
  //return a post
  .put(function(req, res) {
    Post.findById(req.params.id, function(err, post){
      if(err)
        res.send(err);

      post.username = req.body.created_by;
      post.text = req.body.text;

      post.save(function(err, post){
        if(err)
          res.send(err);
        res.json(post);
      });
    });
  })
  //delete existing post
  .delete(function(req, res) {
    Post.remove({
      _id: req.params.id
    }, function(err) {
      if(err)
        res.send(err);
      res.json("deleted :(");
    });
  });

module.exports = router;
