const express = require('express')
const { getAllUsersController, registerController, loginController } = require('../controllers/userControllers')

const router = express.Router()

//GET ALL USERS || GET
router.get('/all-users',getAllUsersController)

//SIGNUP USER || POST
router.post('/register', registerController)

//LOGIN USER || GET
router.post('/login', loginController)

module.exports = router