const {
    pool
} = require('./connection');
const util = require('util');
const query = util.promisify(pool.query).bind(pool);

const result = (resultado) => {
    if (resultado.length > 0) {
        return {
            status: 1,
            data: resultado
        }
    } else {
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
            const queryResult = await query(`SELECT * FROM USERS_T WHERE MAIL_U=? AND PASSWORD_U=?`, [data.txtEmail, data.txtPassword]);
            if (queryResult.length) {
                return {
                    status: 1,
                    message: 'Usuario valido',
                    data: queryResult[0]
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
    },
    getUserData: async (id) => {
        try {
            const queryResult = await query(`SELECT * FROM USERS_T WHERE ID_U=?`, [id]);
            return result(queryResult);
        } catch (error) {
            console.log(error);
            return {
                status: 0,
                message: 'Error al obtener los datos del usuario'
            }
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
    getBTurn: async () => {
        try {
            let queryResult = await query(`SELECT * FROM BTURN_T`);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    }
}

const careers = {
    getAll: async () => {
        try {
            const queryResult = await query(`SELECT * FROM CAREERS_T`);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    },
    getData: async (id) => {
        try {
            const queryResult = await query(`SELECT * FROM CAREERS_T WHERE ID_C=?`, [id]);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    },
    store: async (data) => {
        try {
            const queryResult = await query(`
                INSERT INTO CAREERS_T 
                    (NAME_C, ACRONYM_C, CREATION_C, UPDATE_C)
                VALUES 
                    (?, ?, NOW(), NOW())
            `, [data.txtNewCareer, data.txtAcronymCareer]);
            return {
                status: 1,
                message: 'Carrera agregada correctamente'
            }
        } catch (error) {
            throw error
        }
    },
    delete: async (id) => {
        try {
            const queryResult = await query(`
                DELETE FROM CAREERS_T WHERE ID_C=?
            `, [id]);
            return {
                status: 1,
                message: 'Carrera eliminada correctamente'
            }
        } catch (error) {
            throw error
        }
    },
    update: async (data) => {
        try {
            const queryResult = await query(`
                UPDATE CAREERS_T SET NAME_C=?, ACRONYM_C=?, UPDATE_C=NOW() WHERE ID_C=?
            `, [data.txtEditCareer, data.txtEditAcronymCareer, data.id]);
            return {
                status: 1,
                message: 'Carrera actualizada correctamente'
            }
        } catch (error) {
            throw error
        }
    }
}

const cities = {
    getAll: async () => {
        try {
            const queryResult = await query(`SELECT * FROM CITIES_T`);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    },
    getData: async (id) => {
        try {
            const queryResult = await query(`SELECT * FROM CITIES_T WHERE ID_CS=?`, [id]);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    },
    store: async (data) => {
        try {
            const queryResult = await query(`
                INSERT INTO CITIES_T 
                    (NAME_CS, CREATION_CS, UPDATE_CS)
                VALUES 
                    (?, NOW(), NOW())
            `, [data.txtNewCity]);
            return {
                status: 1,
                message: 'Ciudad agregada correctamente'
            }
        } catch (error) {
            throw error
        }
    },
    update: async (data) => {
        try {
            const queryResult = await query(`
                UPDATE CITIES_T SET NAME_CS=?, UPDATE_CS=NOW() WHERE ID_CS=?
            `, [data.txtEditCity, data.id]);
            return {
                status: 1,
                message: 'Ciudad actualizada correctamente'
            }
        } catch (error) {
            throw error
        }
    },
    delete: async (id) => {
        try {
            const queryResult = await query(`
                DELETE FROM CITIES_T WHERE ID_CS=?
            `, [id]);
            return {
                status: 1,
                message: 'Ciudad eliminada correctamente'
            }
        } catch (error) {
            throw error
        }
    }
}

const states = {
    getAll: async () => {
        try {
            const queryResult = await query(`SELECT * FROM STATES_T`);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    },
    getData: async (id) => {
        try {
            const queryResult = await query(`SELECT * FROM STATES_T WHERE ID_ST=?`, [id]);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    },
    store: async (data) => {
        try {
            const queryResult = await query(`
                INSERT INTO STATES_T 
                    (NAME_ST, CREATION_ST, UPDATE_ST)
                VALUES 
                    (?, NOW(), NOW())
            `, [data.txtNameState]);
            return {
                status: 1,
                message: 'Estado agregado correctamente'
            }
        } catch (error) {
            throw error
        }
    },
    update: async (data) => {
        try {
            console.log(data);
            const queryResult = await query(`
                UPDATE STATES_T SET NAME_ST=?, UPDATE_ST=NOW() WHERE ID_ST=?
            `, [data.txtEditState, data.id]);
            return {
                status: 1,
                message: 'Estado actualizado correctamente'
            }
        } catch (error) {
            throw error
        }
    },
    delete: async (id) => {
        try {
            const queryResult = await query(`
                DELETE FROM STATES_T WHERE ID_ST=?
            `, [id]);
            return {
                status: 1,
                message: 'Estado eliminado correctamente'
            }
        } catch (error) {
            throw error
        }
    }
}

const softSkills = {
    getAll: async () => {
        try {
            const queryResult = await query(`SELECT * FROM SOFTSKILLS_T`);
            return result(queryResult);
        } catch (error) {
            throw error
        }
    }
}


module.exports = {
    users,
    jobs,
    careers,
    cities,
    states,
    softSkills
};