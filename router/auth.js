const express = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult, check } = require('express-validator');
const { generarJWT } = require('../helper/jwt');



const router = express.Router(); 

// Login
router.post('/', [
    check ('correo', 'invalid.correo').isEmail(),
    check ('contraseña', 'invalid.contraseña').not().isEmpty(),
], async function (req, res)  {
    
  
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ mensaje: errors.array()});
      }
  
      const usuario = await Usuario.findOne({correo: req.body.correo})
      if (!usuario) {
          return res.status(400).json({ mensaje: 'Usuario no encontrado'});
      } 

      // Validar contraseña
      const esIgual = bcrypt.compareSync(req.body.contraseña, usuario.contraseña)
      if(!esIgual){
        return res.status(400).json({ mensaje: 'Usuario no encontrado'});
      }

      // Generar token
      const token = generarJWT(usuario);

      res.json({
        _id: usuario._id, nombre: usuario.nombre,
        rol: usuario.rol, correo: usuario.correo, acces_token: token
      })

    } catch(error){
      console.log(error);
      res.status(500).send('Ocurrio un error al crear usuario')
    
  }

});
    


  module.exports = router;