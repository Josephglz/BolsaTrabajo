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

module.exports = router