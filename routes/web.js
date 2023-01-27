const express = require('express')
const router = express.Router()
const db = require('../db/query')
const path = require('path')
const fs = require('fs')
router.use(express.json());

router.get('/', async (req, res) =>{
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

router.get('/login', async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('auth/login', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('auth/login', {
            data: []
        })
    }
})

router.get('/signup', async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('auth/signup', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('auth/signup', {
            data: []
        })
    }
})

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