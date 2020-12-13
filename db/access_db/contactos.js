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
ciudades.id AS id_Cuidad, 
ciudades.Nombre AS nom_Ciudad,
compañias.id AS id_Compañia, 
compañias.Nombre AS nom_Compañia
FROM contactos Contactos
INNER JOIN ciudades ciudades
ON contactos.ciudad_id = ciudades.id
INNER JOIN compañias compañias
ON contactos.compañia_id = compañias.id`;

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
    `INSERT INTO contactos (Nombre, Apellido, Cargo, email, Canal_favorito, Interes, cuidad_id, compañia_id) 
     VALUES ("${body.Nombre}","${body.Apellido}","${body.Cargo}","${body.email}","${body.Canal_favorito}", 
     "${body.Interes}", "${body.cuidad_id}", ${body.compañia_id});`,
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
    cuidad_id=${body.cuidad_id},
    compañia_id=${body.compañia_id}, 
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