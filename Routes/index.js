const express = require('express')
const router = express.Router()
const JokesController = require('../Controllers')

router.get('/jokes', JokesController.get_jokes)

router.post('/joke', JokesController.create_joke)

router.patch('/like-joke/:id', JokesController.like_joke)

router.delete('/joke/:id', JokesController.delete_joke)

module.exports = router
