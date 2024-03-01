const express = require('express')
const router = express.Router()

const {resgister, login} = require('../controllers/auth')

router.post('/resgister', resgister)
router.post('/login', login)

module.exports = router 