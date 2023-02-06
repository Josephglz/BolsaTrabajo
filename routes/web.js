const express = require('express')
const router = express.Router()
const db = require('../db/query')
const { mddwhome, mddLoadData } = require('../extras/mdw')
const path = require('path')
const fs = require('fs')
router.use(express.json());

router.get('/', mddLoadData, async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('home', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('home', {
            data: []
        })
    }
})

router.get('/login', async (req, res) => {
    res.render('auth/login')
})

router.get('/panel', [mddwhome, mddLoadData], async (req, res) => {
    res.render('panel/form')
})

// router.get('/signup', async (req, res) =>{
//     try {
//         let data = await db.jobs.getAll()
//         res.render('auth/signup', {
//             jobs: data.data
//         })
//     } catch (error) {
//         console.log(error);
//         res.render('auth/signup', {
//             data: []
//         })
//     }
// })

router.get('/form', async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('panel/form', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('panel/form', {
            data: []
        })
    }
})

router.get('/ciudades', async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('panel/towns', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('panel/towns', {
            data: []
        })
    }
})

router.get('/estados', async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('panel/estates', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('panel/estates', {
            data: []
        })
    }
})

router.get('/carreras', async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('panel/careers', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('panel/careers', {
            data: []
        })
    }
})

router.get('/usuarios', async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('panel/users', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('panel/users', {
            data: []
        })
    }
})

module.exports = router