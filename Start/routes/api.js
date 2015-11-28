var express = require('express');
var router = express.Router();

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

  .post(function(req, res) {
    //temp
    res.send({message: 'Need to create new post'});
  })
  .get(function(req, res) {
    res.send({message: 'Need to return all posts'});
  })

router.route('/posts/:id')
  //return a post
  .put(function(req, res) {
    return res.send({message: 'Need to return post with ID ' + req.params.id});
  })
  //update existing post
  .get(function(req, res) {
    return res.send({message: 'Need to modify post with ID ' + req.params.id});
  })
  //delete existing post
  .delete(function(req, res) {
    return res.send({message: 'Need to delete post with ID ' + req.params.id});
  });

module.exports = router;
