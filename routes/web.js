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

router.get('/panel', [mddwhome, mddLoadData], async (req, res) => { //Pendiente de vista
    res.render('panel/homeAdmin')
})

router.get('/empleos/crear', [mddwhome, mddLoadData], async (req, res) =>{
    try {
        res.render('panel/empleo')
    } catch (error) {
        throw error
    }
})

router.get('/panel/careers', [mddwhome, mddLoadData], async (req, res) =>{
    try {
        let careerData = (await db.careers.getAll()).data
        res.render('panel/careers', {
            careers: careerData
        })
    } catch (error) {
        console.log(error);
        res.render('panel/careers', {
            careers: []
        })
    }
})

router.get('/panel/cities', [mddwhome, mddLoadData], async (req, res) =>{
    try {
        let citiesData = (await db.cities.getAll()).data
        res.render('panel/cities', {
            cities: citiesData
        })
    } catch (error) {
        console.log(error);
        res.render('panel/cities', {
            cities: []
        })
    }
})

router.get('/panel/states', [mddwhome, mddLoadData], async (req, res) =>{
    try {
        let statesData = (await db.states.getAll()).data
        res.render('panel/state', {
            states: statesData
        })
    } catch (error) {
        console.log(error);
        res.render('panel/state', {
            states: []
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

router.get('/home-admin', mddLoadData, async (req, res) =>{
    try {
        let data = await db.jobs.getAll()
        res.render('homeAdmin', {
            jobs: data.data
        })
    } catch (error) {
        console.log(error);
        res.render('homeAdmin', {
            data: []
        })
    }
})

module.exports = router