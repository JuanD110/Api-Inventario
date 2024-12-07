const express = require('express');
const Inventario = require('../models/Inventario');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

// Crear un nuevo Inventario
router.post('/', [ validarJWT, validarRolAdmin],  async (req, res) => {
  const { serial, modelo, descripcion, foto, color, fechaCompra, precio, usuario, marca, estado, type } = req.body;

  try {
    const nuevoInventario = new Inventario({
      serial,
      modelo,
      descripcion,
      foto,
      color,
      fechaCompra,
      precio,
      usuario,
      marca,
      estado,
      type,
    });

    await nuevoInventario.save();
    res.status(201).json({ mensaje: 'Inventario creado exitosamente', nuevoInventario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear Inventario', error });
  }
});

// Listar todos los Inventarios con populate
router.get('/', [ validarJWT],  async (req, res) => {
  try {
    const inventarios = await Inventario.find().populate('usuario marca estado type');
    res.status(200).json(inventarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar Inventarios', error });
  }
});

// Actualizar un Inventario
router.put('/:id', [ validarJWT, validarRolAdmin], async (req, res) => {
  const { id } = req.params;
  const { serial, modelo, descripcion, foto, color, fechaCompra, precio, usuario, marca, estado, type } = req.body;

  try {
    const inventarioActualizado = await Inventario.findByIdAndUpdate(
      id,
      { serial, modelo, descripcion, foto, color, fechaCompra, precio, usuario, marca, estado, type },
      { new: true }
    );

    if (!inventarioActualizado) {
      return res.status(404).json({ mensaje: 'Inventario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Inventario actualizado exitosamente', inventarioActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar Inventario', error });
  }
});

module.exports = router;
