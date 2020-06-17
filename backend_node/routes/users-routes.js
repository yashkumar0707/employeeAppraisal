const usersControllers = require('../controllers/users-controller')
const express = require('express')
const { check } = require('express-validator')
const router = express.Router()


router.get('/', usersControllers.getUsers)

// router.post('/signup',
//     [
//         check('name').not().isEmpty(),
//         check('email').normalizeEmail().isEmail(),
//         check('password').isLength({ min: 6 })
//     ]
//     , usersControllers.signup)

// router.post('/login', usersControllers.login)

router.post('/addUser', usersControllers.addUser)

router.delete('/deleteUser/:pid', usersControllers.deleteUser)

router.get('/specificuser/:pid', usersControllers.getSpecificUser)

router.patch('/updateUser/:pid', usersControllers.updateUser)

router.get('/specificuser2/:pid', usersControllers.getSpecificUser2)
module.exports = router