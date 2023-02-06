const express = require('express')
const router = express.Router()
const db = require('../db/query')
router.use(express.json());
const Cryptr = require('cryptr');

const cryptr = new Cryptr('6lGeoNFgUnjyCjsT', {saltLength: 10 });

router.post('/api/users/auth/validate', async (req, res) => {
    try {
        const result = await db.users.validate(req.body);
        if(result.status) {
            if(result.data.STATUS_U == 1) {
                req.session.idUser = result.data.ID_U
                res.json({
                    status: 1,
                    message: `Sesión iniciada como ${result.data.NAME_U}`,
                })
            } else if(result.data.STATUS_U == 0) {
                res.json({
                    status: 2,
                    message: 'El usuario no se encuentra activo',
                })
            }
        } else {
            res.json({
                status: 0,
                message: result.message
            })
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
})

module.exports = router