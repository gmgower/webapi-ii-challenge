// ? s1 create index.js and server.js

// ? s2
const express = require('express');

// ? s3
const blogDB = require('./data/db');

// ? s4
const server = express();

// ? s5
server.use(express.json());

// ? s9 test on postman and broswer localhost:8000
server.get('/', (req, res) => {
    res.send(`
      <h2>Building RESTful APIs with Express</h>
      <p>Blog</p>
    `);
  });
  
// ! GET request to /api/posts
server.get('/api/posts', (req, res) => {
    blogDB.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})



// ? s6
module.exports = server;