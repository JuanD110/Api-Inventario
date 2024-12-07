const express = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

// Crear un nuevo TipoEquipo
router.post('/', [ validarJWT, validarRolAdmin], async (req, res) => {
  const { nombre, estado } = req.body;

  try {
    const nuevoTipoEquipo = new TipoEquipo({ nombre, estado });
    await nuevoTipoEquipo.save();
    res.status(201).json({ mensaje: 'TipoEquipo creado exitosamente', nuevoTipoEquipo });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear TipoEquipo', error });
  }
});

// Listar todos los TipoEquipos
router.get('/', [ validarJWT, validarRolAdmin], async (req, res) => {
  try {
    const tipos = await TipoEquipo.find();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar TipoEquipos', error });
  }
});

// Actualizar un TipoEquipo
router.put('/:id', [ validarJWT, validarRolAdmin], async (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;

  try {
    const tipoEquipoActualizado = await TipoEquipo.findByIdAndUpdate(id, { nombre, estado }, { new: true });
    if (!tipoEquipoActualizado) {
      return res.status(404).json({ mensaje: 'TipoEquipo no encontrado' });
    }
    res.status(200).json({ mensaje: 'TipoEquipo actualizado exitosamente', tipoEquipoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar TipoEquipo', error });
  }
});

module.exports = router;
