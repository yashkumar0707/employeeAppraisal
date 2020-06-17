const HttpError = require('../models/http-error')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')
const uuid = require('uuid/v4')
const User = require('../models/user')
const UserInfo = require('../models/user_info')
let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Yash',
        email: 'yash@gmail.com',
        password: 'yash1234'
    }
]

const getUsers = async (req, res, next) => {
    //res.json({ users: DUMMY_USERS })
    let users
    try {
        users = await User.find({}, '-password')
    }
    catch (err) {
        console.log(err)
        return next(new HttpError('Could not retrieve users. Please try again later', 500))
    }
    res.json(users.map(user => user.toObject({ getters: true })))
}

const addUser = async (req, res, next) => {
    console.log(req.body)
    const { name, department, salary, address, designation, age } = req.body
    const createdUser = new User({
        name,
        department,
        salary,
        address,
        designation, age
    })
    try {
        createdUser.save()
    }
    catch (err) {
        return next(new HttpError('Could not create user', 500))
    }
    // DUMMY_USERS.push(createUser)
    res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}


const deleteUser = async (req, res, next) => {
    const userId = req.params.pid
    console.log(userId)
    let user
    try {
        user = await User.findById(userId) //
    }
    catch (err) {
        console.log(err)
        const error = new HttpError('Something went wrong', 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Could not find user', 404)
        return next(error)
    }

    try {
        //await place.remove()
        // const sess = await mongoose.startSession()
        // sess.startTransaction()
        // await user.remove({ session: sess })
        // user.pull(userId)
        // await user.creator.save({ session: sess })
        // await sess.commitTransaction()
        User.deleteOne({ _id: userId }, function (err) { if (err) { console.log(err) } console.log('successful') })
    }
    catch (err) {
        const error = new HttpError('Something went wrong, Could not delete user ', 500)
        return next(error)
    }
    res.status(200).json({ message: 'Deleted user' })
}

const getSpecificUser = async (req, res, next) => {
    const userId = req.params.pid
    console.log(userId)
    let user
    try {
        user = await User.findById(userId) //
        console.log(user)
    }
    catch (err) {
        console.log(err)
        const error = new HttpError('Something went wrong', 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Could not find user', 404)
        return next(error)
    }
    res.json(user.toObject({ getters: true }))
}
const getSpecificUser2 = async (req, res, next) => {
    const userId = req.params.pid
    console.log(userId)
    let user
    try {
        user = await UserInfo.find({ _user: userId }) //
        console.log(user)
    }
    catch (err) {
        console.log(err)
        const error = new HttpError('Something went wrong', 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Could not find user', 404)
        return next(error)
    }
    res.json(user)
}

const updateUser = async (req, res, next) => {
    const { name, salary } = req.body;
    const userId = req.params.pid
    let user
    try {
        user = await User.findById(userId)

    }
    catch (err) {
        const error = new HttpError('Something went wrong. Could not update', 500)
        return next(error)
    }
    user.name = name
    user.salary = salary
    try {
        await user.save()
    }
    catch{
        return next(new HttpError('Something went wrong', 500))
    }

    res.status(200).json({ user: user.toObject({ getters: true }) })
}


exports.getUsers = getUsers
exports.addUser = addUser
exports.deleteUser = deleteUser
exports.getSpecificUser = getSpecificUser
exports.updateUser = updateUser
exports.getSpecificUser2 = getSpecificUser2
//exports.signup = signup
//exports.login = login      