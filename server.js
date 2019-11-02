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
  
// ! s13 POST request to /api/posts
server.post('/api/posts', (req, res) => {
    const postInfo = req.body;
    const {title, contents} = req.body;

    if(!title || !contents) {
        res.status(400).json({success: false, errorMessage: "Please provide title and contents for the post."})
    } else {
        blogDB.insert(postInfo)
        .then(post => {
            res.status(201).json({success: true, post})
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database."})
        })
    }
})

// ! s14 POST request to /api/posts/:id/comments
server.post('/api/posts/:id/comments',  (req, res) => {
    const id = req.params.id;
    const newComment = req.body;
    if(req.body.text) {
        blogDB.findById(id)
        .then(comment => {
            if(comment.length === 0) {
                res.status(404).json({message: `The post with the specified ID ${id} does not exist.`})
            }
            return comment;
        })
        .then(
            blogDB.insertComment(newComment)
            .then(idObj => {
                debug.findCommentById(idObj.id)
                .then(comment => {
                    res.status(201).json(comment)
                })
                .catch(error => {
                    res.status(500).json({message: "Error getting new comment"})
                }) 
            })
            .catch(error => {
                res.status(500).json({error: "These was an error while saving the comment to the database"})
            })
        )
    } else {
        res.status(400).json({errorMessage: "Please provide text for the comment."})
    }
})


// ! s15 DELETE request to /api/posts/:id
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;

    blogDB.remove(id)
        .then(deletePost => {
            if(deletePost) {
                res.status(204).end()
            } else {
                res.status(404).json({message: `The post with the specified ID ${id} does not exist.` })
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed", err})
        })
})

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

// ! s12 GET request to /api/posts/:id/comments
server.get('/api/posts/:id/comments', async (req, res) => {
    try {
        const comments = await blogDB.findCommentById(req.params.id);

        if(comments.length > 0) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({message: `The post with the specified ID ${id} does not exist.`});
        }
    } catch(error) {
        res.status(500).json({
            error: "The comments information could not be retrieved."
        })
    }    
})


// ? s6
module.exports = server;