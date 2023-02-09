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

router.post('/api/careers/get', async (req, res) => {
    try {
        let result = (await db.careers.getData(req.body.id)).data
        if(result.length) {
            res.json({
                status: 1,
                data: result[0]
            })
        } else {
            res.json({
                status: 0,
                message: 'No hay carreras registradas'
            })
        }
    } catch (error) {
        return {
            status: 0,
            message: error.message
        }
    }
})

router.post('/api/careers/store', async (req, res) => {
    try {
        const result = await db.careers.store(req.body);
        if(result.status) {
            res.json({
                status: 1,
                message: 'Carrera agregada correctamente'
            })
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

router.post('/api/careers/update', async (req, res) => {
    try {
        const result = await db.careers.update(req.body);
        if(result.status) {
            res.json({
                status: 1,
                message: 'Carrera actualizada correctamente'
            })
        } else {
            res.json({
                status: 0,
                message: result.message
            })
        }
    } catch (error) {
        return {
            status: 0,
            message: error.message
        }
    }
})

router.post('/api/careers/delete', async (req, res) => {
    try {
        const result = await db.careers.delete(req.body.id);
        if(result.status) {
            res.json({
                status: 1,
                message: 'Carrera eliminada correctamente'
            })
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

router.post('/api/cities/get', async (req, res) => {
    try {
        let result = (await db.cities.getData(req.body.id)).data
        if(result.length) {
            res.json({
                status: 1,
                data: result[0]
            })
        } else {
            res.json({
                status: 0,
                message: 'No hay ciudades registradas'
            })
        }
    } catch (error) {
        return {
            status: 0,
            message: error.message
        }
    }
})

router.post('/api/cities/store', async (req, res) => {
    try {
        const result = await db.cities.store(req.body);
        if(result.status) {
            res.json({
                status: 1,
                message: 'Ciudad agregada correctamente'
            })
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

router.post('/api/cities/update', async (req, res) => {
    try {
        const result = await db.cities.update(req.body);
        if(result.status) {
            res.json({
                status: 1,
                message: 'Ciudad actualizada correctamente'
            })
        } else {
            res.json({
                status: 0,
                message: result.message
            })
        }
    } catch (error) {
        return {
            status: 0,
            message: error.message
        }
    }
})

router.post('/api/cities/delete', async (req, res) => {
    try {
        const result = await db.cities.delete(req.body.id);
        if(result.status) {
            res.json({
                status: 1,
                message: 'Ciudad eliminada correctamente'
            })
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

router.post('/api/states/get', async (req, res) => {
    try {
        let result = (await db.states.getData(req.body.id)).data
        if(result.length) {
            res.json({
                status: 1,
                data: result[0]
            })
        } else {
            res.json({
                status: 0,
                message: 'No hay estados registrados'
            })
        }
    } catch (error) {
        return {
            status: 0,
            message: error.message
        }
    }
})

router.post('/api/states/store', async (req, res) => {
    try {
        const result = await db.states.store(req.body);
        if(result.status) {
            res.json({
                status: 1,
                message: 'Estado agregado correctamente'
            })
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

router.post('/api/states/update', async (req, res) => {
    try {
        const result = await db.states.update(req.body);
        if(result.status) {
            res.json({
                status: 1,
                message: 'Estado actualizado correctamente'
            })
        } else {
            res.json({
                status: 0,
                message: result.message
            })
        }
    } catch (error) {
        return {
            status: 0,
            message: error.message
        }
    }
})

router.post('/api/states/delete', async (req, res) => {
    try {
        const result = await db.states.delete(req.body.id);
        if(result.status) {
            res.json({
                status: 1,
                message: 'Estado eliminado correctamente'
            })
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