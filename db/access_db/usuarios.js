
const sequelize = require('../../../DataWarehouse/backEnd/js/conexiondb');


const eliminarUsuario = async (id) => {
    return await sequelize.query(
      `DELETE FROM usuarios WHERE ID = ${id};`,
      { type: sequelize.QueryTypes.DELETE }
    );
  }; 



  module.exports = {
    eliminarUsuario,
};