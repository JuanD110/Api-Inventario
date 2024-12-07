const mongoose = require('mongoose');

const InventarioSchema = new mongoose.Schema({
  serial: { type: String, unique: true, required: true },
  modelo: { type: String, unique: true, required: true },
  descripcion: { type: String },
  foto: { type: String },
  color: { type: String },
  fechaCompra: { type: Date },
  precio: { type: Number },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  marca: { type: mongoose.Schema.Types.ObjectId, ref: 'Marca' },
  estado: { type: mongoose.Schema.Types.ObjectId, ref: 'EstadoEquipo' },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoEquipo' },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventario', InventarioSchema);