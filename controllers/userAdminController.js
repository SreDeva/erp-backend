const AdminUser = require('../models/adminUserModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}


// login a user
const loginAdminUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await AdminUser.login(email, password)

    //create token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const signupAdminUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await AdminUser.signup(email, password)
  
      //create token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

  module.exports = { signupAdminUser, loginAdminUser }