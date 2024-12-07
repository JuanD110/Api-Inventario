const express = require('express');
const Marca = require('../models/Marca');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

// Crear una nueva Marca
router.post('/', [ validarJWT, validarRolAdmin], async (req, res) => {
  const { nombre, estado } = req.body;

  try {
    const nuevaMarca = new Marca({ nombre, estado });
    await nuevaMarca.save();
    res.status(201).json({ mensaje: 'Marca creada exitosamente', nuevaMarca });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear Marca', error });
  }
});

// Listar todas las Marcas
router.get('/', [ validarJWT, validarRolAdmin], async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.status(200).json(marcas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar Marcas', error });
  }
});

// Actualizar una Marca
router.put('/:id', [ validarJWT, validarRolAdmin], async (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;

  try {
    const marcaActualizada = await Marca.findByIdAndUpdate(id, { nombre, estado }, { new: true });
    if (!marcaActualizada) {
      return res.status(404).json({ mensaje: 'Marca no encontrada' });
    }
    res.status(200).json({ mensaje: 'Marca actualizada exitosamente', marcaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar Marca', error });
  }
});

module.exports = router;
