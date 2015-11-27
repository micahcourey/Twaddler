var express = require('express');
var router = express.Router();

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
    return res.send({message: 'Need to return post with ID ' + req.param.id});
  })
  //update existing post
  .get(function(req, res) {
    return res.send({message: 'Need to modify post with ID ' + req.param.id});
  })
  //delete existing post
  .delete(function(req, res) {
    return res.send({message: 'Need to delete post with ID ' + req.param.id});
  });

module.exports = router;
