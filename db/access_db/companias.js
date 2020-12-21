const sequelize = require('../../../DataWarehouse/backEnd/js/conexiondb');

//detallesCompanias
const infoCompanias = `SELECT 
companias.id AS id_Comp,  
companias.Nombre AS nom_Comp,
companias.Direccion AS direccion_Comp,
companias.email AS email_Comp,
companias.Telefono AS telefono_Comp,
ciudades.id AS id_Ciudad,
ciudades.Nombre AS nom_Ciudad
FROM companias companias
INNER JOIN ciudades ciudades
ON companias.ciudad_id = ciudades.id`;

const obtenerCompanias = async () => { ///encontrarTodos
    return await sequelize.query(infoCompanias, {
      type: sequelize.QueryTypes.SELECT,
    });
};

const obtenerCompaniaxEmail = async (body) => { //encontrarPorEmail
  return await sequelize.query(`SELECT * FROM companias WHERE EMAIL = "${body.email}";`, {
    type: sequelize.QueryTypes.SELECT,
  });
};

const obtenerCompaniaxId = async (id) => { //encontrarPorId
  return await sequelize.query(`SELECT * FROM companias WHERE ID = "${id}";`, {
    type: sequelize.QueryTypes.SELECT,
  });
};


const agregarCompania = async (body) => { // agregar
  return await sequelize.query(
    `INSERT INTO compañias (Nombre, Direccion, email, Telefono, ciudad_id) 
     VALUES ("${body.Nombre}","${body.Direccion}", "${body.email}", "${body.Telefono}", "${body.ciudad_id}");`,
    { type:sequelize.QueryTypes.INSERT }
  );
};

const modificarCompania = async (body, id) => { //actualizarCompania
  return await sequelize.query(
    `UPDATE companias SET 
    Nombre="${body.Nombre}", 
    Direccion="${body.Direccion}",
    email="${body.email}",
    Telefono="${body.Telefono}", 
    ciudad_id=${body.ciudad_id} 
    WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.UPDATE }
  );
};

const eliminarCompania = async (id) => { //eliminarCompania
  return await sequelize.query(
    `DELETE FROM companias WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.DELETE }
  );
};


module.exports = {
    obtenerCompanias,
    obtenerCompaniaxEmail,
    obtenerCompaniaxId,
    agregarCompania,
    modificarCompania,
    eliminarCompania
}