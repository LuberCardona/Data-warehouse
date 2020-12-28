const router = require("express").Router();
const access_db = require('../../../../DataWarehouse/db/access_db/companias');


router.get('/infoCompanias', async (req, res) => {
    try {
      const obtenerCompanias = await access_db.obtenerCompanias();
      res.status(200).json(obtenerCompanias);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


router.get('/infoCompania/:id', async (req, res) => { // info una compañia por id 
    try {
      const { id } = req.params;  
      let obtenerCompaniaId = await access_db.obtenerCompaniaxId(id);
  
      return res.json(obtenerCompaniaId);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.post('/agregarCompania', async (req, res)=>{  //  Crear compañia si email no existe
    try {
      const addCompania = await access_db.obtenerCompaniaxEmail(req.body);
      if (addCompania.length) {
        return res.status(409).json({ error: 'La Compañìa ya existe' });
      }
      await access_db.agregarCompania(req.body);
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

  
router.put('/modificarCompania/:id', async (req, res) => {
    try {
      const { id } = req.params;        
      await access_db.modificarCompania(req.body, id);
  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


router.delete('/eliminarCompania/:id', async (req, res) => {
    try {
      const { id } = req.params;  
      await access_db.eliminarCompania(id);  
      res.json({ message: "Compañìa Eliminada" });
    } catch (error) {
      res.status(400).json("La compañia no podra ser eliminada ya que se encuentra asociada a un contacto");
    }
});
    
  
module.exports = router;
