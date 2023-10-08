const express = require('express')

// controller functions
const { loginAdminUser, signupAdminUser } = require('../controllers/userAdminController')

const router = express.Router()

// login route
router.post('/adminLogin', loginAdminUser)

// signup route
router.post('/adminSignup', signupAdminUser)

module.exports = router