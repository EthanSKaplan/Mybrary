// everything for when we don't actually have a resource/model in our URL

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router;