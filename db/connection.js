const datosConfig = require('./credentials');
const mysql = require('mysql');

const pool = mysql.createPool(datosConfig, (err) => {
    if(err) {
      console.log("[SERVIDOR]: Error al conectar con la base de datos: " + err.message);
      connectDB();
    }
    console.log("[SERVIDOR]: Conexión exitosa.");
})

let connectDB = () => {
  setTimeout(() => {
    pool.getConnection((err) => {
      if(err) {
        console.log("[SERVIDOR]: Error al conectar con la base de datos: " + err.message);
        connectDB();
      }
      console.log("[SERVIDOR]: Conexión exitosa.")
    })
  }, 2000)
}


module.exports = {
  pool,
  mysql
};