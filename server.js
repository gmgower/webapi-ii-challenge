// ? s1 create index.js and server.js

// ? s2
const express = require('express');

// ? s20 import router
const blogRouter = require('./blog-router')

// ? s3
// ? 22 cut & paste to blog-router.js
// const blogDB = require('./data/db');

// ? s4
const server = express();

// ? s5 middleware
server.use(express.json());

// ? s23 tell server to use router, set base url(route)
server.use('/api/posts', blogRouter)

// ? s9 test on postman and broswer localhost:8000 this is absolute pather
server.get('/', (req, res) => {
  res.send(`
      <h2>Building RESTful APIs with Express</h>
      <p>Blog</p>
    `);
});

//? s21 cut & paste all endpost with /api/post/ to blog-router.js


// ? s6
module.exports = server;
