// Create web server with express
// Import express module
const express = require('express');
// Create express server
const app = express();
// Define port
const port = 3000;
// Import comments data
const comments = require('./comments');
// Import body parser
const bodyParser = require('body-parser');

// Use body parser
app.use(bodyParser.json());

// Create get comments route
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create get comment by id route
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === id);
  res.json(comment);
});

// Create post comment route
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.json(newComment);
});

// Create put comment by id route
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const newComment = req.body;
  const comment = comments.find(comment => comment.id === id);
  comment.author = newComment.author;
  comment.comment = newComment.comment;
  res.json(comment);
});

// Create delete comment by id route
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const commentIndex = comments.findIndex(comment => comment.id === id);
  comments.splice(commentIndex, 1);
  res.json({message: 'Comment deleted'});
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});