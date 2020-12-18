
const sequelize = require('../../../DataWarehouse/backEnd/js/conexiondb');


const eliminarUsuario = async (id) => {
    return await sequelize.query(
      `DELETE FROM usuarios WHERE ID = ${id};`,
      { type: sequelize.QueryTypes.DELETE }
    );
  }; 


/*const actualizarUsuario = async (body, id) => { // S
    return await sequelize.query(
      `UPDATE usuarios SET Nombre="${body.Nombre}",  Apellido="${body.Apellido}",
      email="${body.email}", perfil="${body.perfil}", password="${body.password}",  WHERE ID = ${id};`,
      { type: sequelize.QueryTypes.UPDATE }
    );
};*/


  module.exports = {
    eliminarUsuario,
    //actualizarUsuario
};