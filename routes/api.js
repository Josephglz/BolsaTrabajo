const express = require('express')
const router = express.Router()
const db = require('../db/query')
router.use(express.json());
const bcrypt = require('bcrypt')
const salts = 10

router.post('/api/users/auth/validate', async (req, res) => {
    try {
        bcrypt.hash(req.body.txtPassword, 'asd', function(err, hash) {
            console.log(hash);
            let validateUser = db.users.validate({
                email: req.body.txtEmail,
                password: hash,
            })
        });
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
})

module.exports = router