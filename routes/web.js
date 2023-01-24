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

module.exports = router