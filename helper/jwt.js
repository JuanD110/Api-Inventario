const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    const payload = { _id: usuario._id, nombre: usuario.nombre,
        correo: usuario.correo, contraseña: usuario.contraseña,
        rol: usuario.rol, estado: usuario.estado };

const token = jwt.sign(payload, '12345678', { expiresIn: '1h'} );
return token;

}

module.exports = {
    generarJWT
}