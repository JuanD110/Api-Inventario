const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['Administrador', 'Docente'], required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Usuario', UsuarioSchema);