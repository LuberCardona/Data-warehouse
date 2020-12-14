const sequelize = require('../../backEnd/js/conexiondb');

// detallesCiudades
const infoCiudades = `SELECT 
ciudades.id AS id_Ciudad,
ciudades.Nombre AS nom_Ciudad,
paises.id AS id_Pais,
paises.Nombre AS nom_Pais,
regiones.id AS id_Region,
regiones.Nombre AS nom_Region
FROM ciudades ciudades
INNER JOIN paises paises
ON ciudades.pais_id = paises.id
INNER JOIN regiones regiones
ON paises.region_id = regiones.id`;

const obtenerCiudades = async () => {  //encontrarTodos
    return await sequelize.query(infoCiudades, {
      type: sequelize.QueryTypes.SELECT,
    });
};

const obtenerRegiones = async () => { //encontrarRegiones
  return await sequelize.query(`SELECT * FROM regiones`, {
    type: sequelize.QueryTypes.SELECT,
  });
};

const obtenerPaises = async () => { //encontrarPaises
  return await sequelize.query(`SELECT * FROM paises`, {
    type: sequelize.QueryTypes.SELECT,
  });
};

const obtenerRegionxId = async (id) => { //encontrarRegionPorId
    return await sequelize.query(`SELECT * FROM regiones WHERE ID=${id};`, {
      type: sequelize.QueryTypes.SELECT,
    });
};

const obtenerPaisxRegionId = async (region_id) => { //encontrarPaisPorRegionId
    return await sequelize.query(`SELECT * FROM paises WHERE region_id=${region_id};`, {
      type: sequelize.QueryTypes.SELECT,
    });
};

const obtenerCiudadxPaisId = async (pais_id) => {
  return await sequelize.query(`SELECT * FROM ciudades WHERE pais_id=${pais_id};`, {
    type: sequelize.QueryTypes.SELECT,
  });
};


const obtenerRegionxDescripcion = async (body) => { //encontrarRegionPorDescripcion
  return await sequelize.query(`SELECT * FROM regiones WHERE Nombre="${body.Nombre}";`, {
    type: sequelize.QueryTypes.SELECT,
  });
};

const agregarRegion = async (body) => {
  return await sequelize.query(
    `INSERT INTO regiones (Nombre) VALUES ("${body.Nombre}");`,
    { type: sequelize.QueryTypes.INSERT }
  );
};

const ObtenerPaisxDescripcion = async (body) => {
  return await sequelize.query(`SELECT * FROM paises WHERE Nombre="${body.Nombre}";`, {
    type: sequelize.QueryTypes.SELECT,
  });
};

const agregarPais = async (body) => {
  return await sequelize.query(
    `INSERT INTO paises (Nombre, region_id) VALUES ("${body.Nombre}", ${body.region_id});`,
    { type: sequelize.QueryTypes.INSERT }
  );
};

const obtenerCiudadxDescripcion = async (body) => {
  return await sequelize.query(`SELECT * FROM ciudades WHERE Nombre="${body.Nombre}";`, {
    type: sequelize.QueryTypes.SELECT,
  });
};

const agregarCiudad = async (body) => {
  return await sequelize.query(
    `INSERT INTO ciudades (Nombre, pais_id) VALUES ("${body.Nombre}", ${body.pais_id});`,
    { type: sequelize.QueryTypes.INSERT }
  );
};

const modificarRegion = async (body, id) => { //actualizarRegion
  return await sequelize.query(
    `UPDATE regiones SET Nombre = "${body.Nombre}" WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.UPDATE }
  );
};

const modificarPais = async (body, id) => { //actualizarPais
  return await sequelize.query(
    `UPDATE paises SET Nombre = "${body.Nombre}" WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.UPDATE }
  );
};

const modificarCiudad = async (body, id) => {
  return await sequelize.query(
    `UPDATE ciudades SET Nombre = "${body.Nombre}" WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.UPDATE }
  );
};


const eliminarRegion = async (id) => {
  return await sequelize.query(
    `DELETE FROM regiones WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.DELETE }
  );
};

const eliminarPais = async (id) => {
  return await sequelize.query(
    `DELETE FROM paises WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.DELETE }
  );
};


const eliminarCiudad = async (id) => {
  return await sequelize.query(
    `DELETE FROM ciudades WHERE ID = ${id};`,
    { type: sequelize.QueryTypes.DELETE }
  );
};


module.exports = {
    obtenerCiudades,
    obtenerRegiones,
    obtenerPaises,
    obtenerRegionxId,
    obtenerPaisxRegionId,
    obtenerCiudadxPaisId,
    obtenerRegionxDescripcion,
    agregarRegion,
    ObtenerPaisxDescripcion,
    agregarPais,
    obtenerCiudadxDescripcion,
    agregarCiudad,
    modificarRegion,
    modificarPais,
    modificarCiudad,
    eliminarRegion,
    eliminarPais,
    eliminarCiudad
};