const sequelize = require('../../../DataWarehouse/backEnd/js/conexiondb');

// detallesContactos
const InfoContactos = `SELECT
contactos.id AS id_Contacto,
contactos.Nombre AS nom_Contacto, 
contactos.Apellido AS apellido_Contacto,
contactos.Cargo AS cargo, 
contactos.email AS email,
contactos.Canal_favorito AS canal_favorito,
contactos.Interes AS interes,
ciudades.id AS id_Ciudad, 
ciudades.Nombre AS nom_Ciudad,
companias.id AS id_Compania, 
companias.Nombre AS nom_Compania
FROM contactos Contactos
INNER JOIN ciudades ciudades
ON contactos.ciudad_id = ciudades.id
INNER JOIN companias companias
ON contactos.compania_id = companias.id`;

const obtenerContactos = async () => {  ///encontrarTodos
  return await sequelize.query(InfoContactos, {
    type: sequelize.QueryTypes.SELECT,
  });
};
 
const obtenerContactoxEmail = async (body) => {  //encontrarPorEmail
  return await sequelize.query(`SELECT * FROM contactos WHERE EMAIL = "${body.email}";`, {
    type: sequelize.QueryTypes.SELECT,
  });
};
 //encontrarPorId
const obtenerContactoxId = async (id) => {
  return await sequelize.query(`SELECT * FROM contactos WHERE ID = "${id}";`, {
    type: sequelize.QueryTypes.SELECT,
  });
};

const agregarContacto= async (body) => { //agregar
  return await sequelize.query(
    `INSERT INTO contactos (Nombre, Apellido, Cargo, email, Canal_favorito, Interes, ciudad_id, compania_id) 
     VALUES ("${body.Nombre}","${body.Apellido}","${body.Cargo}","${body.email}","${body.Canal_favorito}", 
     "${body.Interes}", "${body.ciudad_id}", ${body.compania_id});`,
    { type: sequelize.QueryTypes.INSERT }
  );
};

const modificarContacto = async (body, id) => {  //actualizarContacto
  return await sequelize.query(
    `UPDATE contactos SET 
    Nombre = "${body.Nombre}", 
    Apellido = "${body.Apellido}", 
    Cargo = "${body.Cargo}",
    email="${body.email}",
    Canal_favorito="${body.Canal_favorito}",
    Interes="${body.Interes}",
    ciudad_id=${body.cuidad_id},
    compania_id=${body.compañia_id}, 
    WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.UPDATE }
  );
};

const eliminarContacto = async (id) => {
  return await sequelize.query(
    `DELETE FROM contactos WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.DELETE }
  );
};



module.exports = {
    obtenerContactos,
    obtenerContactoxEmail,
    obtenerContactoxId,
    agregarContacto,
    modificarContacto,
    eliminarContacto     
};