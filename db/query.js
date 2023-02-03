const {
    pool
} = require('./connection');
const util = require('util');

const query = util.promisify(pool.query).bind(pool);

const result = (resultado) => {
    if(resultado.length > 0){
        return {
            status: 1,
            data: resultado
        }
    }else{
        return {
            status: 0,
            data: []
        }
    }
    return resultado;
}

const users = {
    validate: async (data) => {
        try {
            const queryResult = await query(`SELECT PASSWORD_U FROM USERS_T WHERE MAIL_U = ?`, [data.email]);
            if(queryResult.length) {
            } else {
                return {
                    status: 0,
                    message: 'El usuario no se ha localizado'
                }
            }
        } catch (error) {
            throw error
        }
    },
    insert: async (data) => {
        try {
            const queryResult = await query(`
                INSERT INTO USERS_T (NAME_U, MAIL_U, PASSWORD_U, ROLE_U, CREATION_U, UPDATE_U) VALUES (?, ?, ?, ?, now(), now())
            `, [data.name, data.email, data.password, data.role]);
        } catch (error) {
            throw error
        }
    }
}

const jobs = {
    getAll: async () => {
        try {
            const queryResult = await query(`SELECT * FROM JOBS_T`);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    },
}


module.exports = {
    users,
    jobs
};