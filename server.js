const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const db = require('./db/query')
// const sesion = require('./db/session_connection')

//CONFIGURATIONS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'))
hbs.registerPartials(path.join(__dirname, './views/partials'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '100mb' }))
// app.use(sesion())
// require('./extras/helpers')

//STATIC DIRECTORIES
app.use(express.static(path.join(__dirname, './assets')))
app.use(require('./routes/index'))

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`[SERVIDOR]: Iniciando servidor... ${port}`)
})
.on('listening', () => {
    console.log(`[SERVIDOR]: Servidor iniciado ${port}.`)
})
.on('error', (err) => {
    console.log(`[SERVIDOR]: Error al iniciar servidor ${port}.`)
    console.log(err)
})
.on('close', () => {
    console.log(`[SERVIDOR]: Se ha cerrado el servidor ${port}.`)
})