const express = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');


const router = express.Router(); 

// Crear un usuario
router.post('/', [validarJWT, validarRolAdmin], async (req, res) => {
  const { nombre, correo, contraseña, rol, estado } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: contrasenaEncriptada,
      rol,
      estado,
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
});

// Listar usuarios
router.get('/', [validarJWT, validarRolAdmin], async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar usuarios', error });
  }
});

// Actualizar un usuario
router.put('/:id', [validarJWT, validarRolAdmin], async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contraseña, rol, estado } = req.body;

  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      const contrasenaEncriptada = await bcrypt.hash(contraseña, salt);
      usuario.contraseña = contrasenaEncriptada;
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.correo = correo || usuario.correo;
    usuario.rol = rol || usuario.rol;
    usuario.estado = estado || usuario.estado;

    await usuario.save();
    res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
});

module.exports = router; 