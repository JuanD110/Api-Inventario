const mongoose = require('mongoose');

const TipoEquipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Active' },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TipoEquipo', TipoEquipoSchema);