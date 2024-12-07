const express = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

// Crear un nuevo EstadoEquipo
router.post('/', [ validarJWT, validarRolAdmin], async (req, res) => {
  const { nombre, estado } = req.body;

  try {
    const nuevoEstadoEquipo = new EstadoEquipo({ nombre, estado });
    await nuevoEstadoEquipo.save();
    res.status(201).json({ mensaje: 'EstadoEquipo creado exitosamente', nuevoEstadoEquipo });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear EstadoEquipo', error });
  }
});

// Listar todos los EstadoEquipos
router.get('/', [ validarJWT, validarRolAdmin],  async (req, res) => {
  try {
    const estados = await EstadoEquipo.find();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar EstadoEquipos', error });
  }
});

// Actualizar un EstadoEquipo
router.put('/:id', [ validarJWT, validarRolAdmin], async (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;

  try {
    const estadoActualizado = await EstadoEquipo.findByIdAndUpdate(id, { nombre, estado }, { new: true });
    if (!estadoActualizado) {
      return res.status(404).json({ mensaje: 'EstadoEquipo no encontrado' });
    }
    res.status(200).json({ mensaje: 'EstadoEquipo actualizado exitosamente', estadoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar EstadoEquipo', error });
  }
});

module.exports = router;
