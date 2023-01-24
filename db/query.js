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
    getAll: async () => {
        try {
            const queryResult = await query(`SELECT * FROM USERS_T`);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    },
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