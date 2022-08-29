const express = require('express')
const db = require('../database/user');
const { authRole } = require('../middleware/authMid');

const router = express.Router();

router.get('/roles', authRole('admin', 4), async (req, res) => {

    return res.json({
        message: 'succes'
    })
}
    
)


router.get('/', (req, res) => {
    res.json([
        {
            message: 'users'
        }
    ])
})

module.exports = router;
