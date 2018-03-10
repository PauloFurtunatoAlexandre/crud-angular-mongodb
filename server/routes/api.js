const expres = require('express');
const router = expres.Router();
const mongoose = require('mongoose');
const article = require('../models/article');
const db = 'mongodb://pauloa:P@ulo123@ds253918.mlab.com:53918/blogapp-paulo';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dbCollection', function(err, db) {
  if (err) {
    console.log(
      'Unable to connect to the server. Please start the server. Error:',
      err
    );
  } else {
    console.log('Connected to Server successfully!');
  }
});

router.get('/all', function(req, res) {
  article.find({}).exec(function(err, articles) {
    if (err) {
      console.log('Error when retrieving the data');
    } else {
      console.log(articles);
      res.json(articles);
    }
  });
});

router.get('/articles/:id', function(req, res) {
  console.log('Request a specific article');
  article.findById(req.params.id).exec(function(err, article) {
    if (err) {
      console.log('Error getting the article');
    } else {
      res.json(article);
    }
  });
});

router.post('/create/', function(req, res) {
  console.log('Created a specific article');
  var newArticle = new article();
  newArticle.title = req.body.title;
  newArticle.content = req.body.content;
  newArticle.save(function(err, article) {
    if (err) {
      console.log('Error to insert the article');
    } else {
      res.json(article);
    }
  });
});

router.put('/update/:id', function(req, res) {
  console.log('Updated a specific article');

  article.findById(req.params.id).exec(function(err, article) {
    if (err) {
      console.log('Could not find the Article');
    } else {
      article.title = req.body.title;
      article.content = req.body.content;
      article.save();
      res.json(article);
    }
  });
});

router.get('/delete/:id', function(req, res) {
  console.log('Deleting a specific article');
  article.findByIdAndRemove(req.params.id).exec(function(err, article) {
    if (err) {
      console.log('Error deleting the article');
    } else {
      res.json(article);
    }
  });
});

module.exports = router;
