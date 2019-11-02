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
  
// ! s10 GET request to /api/posts
server.get('/api/posts', (req, res) => {
    blogDB.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved.", err})
    })
})


// ! s11 GET request to /api/posts/:id
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id

    blogDB.findById(id)
        .then(post => {
            if(post){
                res.status(200).json({success: true, post})
            } else {
                res.status(404).json({success: false, message: `The post with the specified ID ${id} does not exist.`})
            }
        })
        .catch(err => {
            res.status(500).json({err: `The user information could not be retrieved.`, err})
        })
})



// ? s6
module.exports = server;