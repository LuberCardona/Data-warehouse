const router = require("express").Router();
//const validaciones = require('../../js/middlewares/validaciones');
//const sequelize = require('../../js/conexiondb');
//const jwt = require('jsonwebtoken');
//const SECRET = process.env.SECRET;  
const access_db = require('../../../db/access_db/ciu_reg_pais'); 

// GET CIU-REG-PAIS
router.get('infoCiudades/', async (req, res) => {
  try {
    let obtenerCiudades = await access_db.obtenerCiudades();
    res.status(200).json(obtenerCiudades);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/infoRegiones', async (req, res) => {  // OBTENER TODAS LAS REGIONES
    try { 
      let obtenerRegiones = await access_db.obtenerRegiones();
      return res.json(obtenerRegiones);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


router.get("/infoRegion/:id", async (req, res) => {  // OBTENER UNA REGION POR ID
    try {
      const { id } = req.params;  
      let obtenerRegion = await access_db.obtenerRegionxId(id);  
      return res.json(obtenerRegion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get("/infopaises/:regionId", async (req, res) => {
    try {
      const { regionId } = req.params;  
      let obtenerPaisesXreg = await access_db.obtenerPaisxRegionId(regionId);
      return res.json(obtenerPaisesXreg);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get("/infoCiudades/:paisId", async (req, res) => {
    try {
      const { paisId } = req.params;  
      let infoCiudadesXpais= await access_db.obtenerCiudadxPaisId(paisId);
      res.status(200).json(infoCiudadesXpais);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get("/infoPaises", async (req, res) => {
    try {
      let obtenerPaises = await access_db.obtenerPaises();
      return res.json(obtenerPaises);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

// POST CIU-REG_PAIS

router.post('/crearRegion', async (req, res)=>{  // CREAR REGION SI NO EXISTE POR NOMBRE
    try {
      const crearRegion = await access_db.obtenerRegionxDescripcion(req.body);
      console.log(crearRegion);
      if (crearRegion.length) {
        return res.status(409).json({ error: "La Región ya Existe!" });
      }
      await access_db.agregarRegion(req.body);
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.post('/crearPais', async (req, res)=>{ // crear pais so no existe por nombre
    try {
      const crearPais = await access_db.ObtenerPaisxDescripcion(req.body);
      if (crearPais.length) {
        return res.status(409).json({ error: 'El país ya existe' });
      }
      await access_db.agregarPais(req.body);
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.post('/crearCuidad', async (req, res)=>{ // CREAR CIUDAD SI NO EXISTE POR DESCRIP
    try {
      const crearCiudad = await access_db.obtenerCiudadxDescripcion(req.body);
      if (crearCiudad.length) {
        return res.status(409).json({ error: 'La ciudad ingresada ya existe!' });
      }
      await access_db.agregarCiudad(req.body);
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

// MODIFICAR  PUT - CIU-REG_PAIS

router.put('/modificarRegion/:id', async (req, res) => {
    try {
      const { id } = req.params;        
      await access_db.modificarRegion(req.body, id);  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


router.put('/modificarPais/:id', async (req, res) => {
    try {
      const { id } = req.params;        
      await access_db.modificarPais(req.body, id);  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.put('/modificarCiudad/:id', async (req, res) => {
    try {
      const { id } = req.params;        
      await access_db.modificarCiudad(req.body, id);  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

// eliminar CIU-REG-PAIS 

router.delete('/eliminarRegion/:id', async (req, res) => {
    try {
      const { id } = req.params;  
      await access_db.eliminarRegion(id);  
      res.json({ message: 'Región eliminada' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.delete('/eliminarPais/:id', async (req, res) => {
    try {
      const { id } = req.params;  
      await access_db.eliminarPais(id);  
      res.json({ message: 'País eliminado' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.delete("/eliminarCiudad/:id", async (req, res) => {
    try {
      const { id } = req.params;  
      await access_db.eliminarCiudad(id);  
      res.json({ message: 'Ciudad eliminada' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});
  
module.exports = router;














