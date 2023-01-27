const express = require('express')
const router = express.Router()
const db = require('../db/query')
const path = require('path')
const fs = require('fs')
router.use(express.json());

router.get('/', async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('index', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('index', {
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
        res.render('auth/form', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('auth/form', {
            data: []
        })
    }
})

router.get('/home', async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('auth/home', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('auth/home', {
            data: []
        })
    }
})

module.exports = router