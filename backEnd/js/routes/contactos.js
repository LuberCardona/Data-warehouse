
const router = require("express").Router();
//const validaciones = require('../../js/middlewares/validaciones');
//const sequelize = require('../../js/conexiondb');
//const jwt = require('jsonwebtoken');
//const SECRET = process.env.SECRET;
const access_db = require('../../../../DataWarehouse/db/access_db/contactos'); 


// consultar todos los contactos 

router.get('/infoContactos', async (req, res) => {
  try {
    const obtenerContactos = await access_db.obtenerContactos();
    res.status(200).json(obtenerContactos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// consultar contacto por id
router.get('/infoContacto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obtenerContactoId = await access_db.obtenerContactoxId(id);
    return res.json(obtenerContactoId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST CONTACTOS - el usuario con perfil de administrador puede crear un CONTACTO

router.post('/agregarContactoN', async (req, res)=>{
  try {
    const contactoXemail = await access_db.obtenerContactoxEmail(req.body);
    if (contactoXemail.length) {
      return res.status(409).json({ error: "El contacto ya existe" });
    }
    await access_db.agregarContacto(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.put('/modificarContacto/:id', async (req, res) => {
  try {
    const { id } = req.params;      
    await access_db.modificarContacto(req.body, id);

    res.json(req.body);
    console.log(id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/eliminarContacto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await access_db.eliminarContacto(id);
    res.json({ message: 'Contacto eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;






















