const express = require('express')
const router = express.Router()
const db = require('../db/query')
router.use(express.json());

router.post('/api/users/auth/validate', async (req, res) => {
    try {
        const result = await db.users.validate(req.body);
        res.send(result);
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
})

module.exports = router