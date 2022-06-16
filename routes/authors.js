const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author.js')

// All authors route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') { // GET sends data through query
    searchOptions.name = new RegExp(req.query.name, 'i') // don't understand this
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', { 
      authors: authors,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }

})

// New authors route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author()})
})

// Create author route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name // POST sends data through body
  })
  try {
    const newAuthor = await author.save()
    // res.redirect(`authors/${newAuthor.di}`)
    res.redirect(`authors`)
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating author'
    })
  }
})


module.exports = router; 