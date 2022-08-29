require('dotenv').config()

const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')

require('../passport')


const db = require('../database/user');
const {_prepareUser} = require('../helpers/UserHelpers')

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const usersFetched = await db.getUserByName(username)
        const user = usersFetched[0];
        // User Not Found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            })
        }

        // Incorrect Password
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Password'
            })
        }

        const payload = {
            username: user.name,
            id: user.id
        }

        const token = jwt.sign(payload, 'Random String', { expiresIn: '1d' })
        
        await db.userLogged(user)
        const preparedUser = await _prepareUser(user)
        res.locals.user = preparedUser
        res.status(200).json({
            success: true,
            message: 'Logged in Successfully',
            token: 'Bearer ' + token,
            user: preparedUser
        })

    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            message: error
        })
    }
})

router.post('/register', async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await db.getUserByName(name)
        console.log('User', user);
        if (user.length) return res.status(400).json({ message: 'User Already Exist' })

        else {
            const passwordHashed = await bcrypt.hash(password, 10)
            const user = { name, password: passwordHashed };
            await db.addUser(user)
            res.status(201).json(user)
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
})


router.get('/protected/user', (req, res) => {
    return res.status(200).send({
        success: true
    })
})

router.use('/api/user', passport.authenticate('jwt', {session: false}), require('./user'))

module.exports = router;