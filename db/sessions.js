var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)

const sesionesConfig = {
    host: '134.209.66.194',
    user: 'bolsa',
    password: 'PSxQGhSQhz9@',
    database: 'bolsatrabajo',

    clearExpired: true,
	checkExpirationInterval: 1500000,
	expiration: 3600000,
	createDatabaseTable: true,
	connectionLimit: 1,
	endConnectionOnClose: true,
	charset: 'utf8mb4_bin',
	schema: {
		tableName: 'SESSIONS_T',
		columnNames: {
			session_id: 'SESSION_ID',
			expires: 'EXP_DATE',
			data: 'DATA'
		}
	}
}

var sessionStore = new MySQLStore(sesionesConfig)

module.exports = session({
    key: 'BOLSA',
    secret: 'ae978aa10c628b27427ff2615ad925abdf4171fc7b4d1f7067bd35b23960d371',
    saveUninitialized: false,
    resave: false,
    store: sessionStore
})