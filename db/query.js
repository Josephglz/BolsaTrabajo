const {
    pool
} = require('./connection');
const util = require('util');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('6lGeoNFgUnjyCjsT', {saltLength: 10 });
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
            const queryResult = await query(`SELECT * FROM USERS_T WHERE MAIL_U=? AND STATUS_U <> 2`, [data.txtEmail]);
            if(queryResult.length) {
                if(cryptr.decrypt(queryResult[0].PASSWORD_U) == data.txtPassword) {
                    return {
                        status: 1,
                        message: 'Usuario valido',
                        data: queryResult[0]
                    }
                }
            } else {
                return {
                    status: 0,
                    message: 'El correo ó contraseña no coinciden'
                }
            }
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