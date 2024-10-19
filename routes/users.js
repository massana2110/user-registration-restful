const express = require('express');
const router = express.Router();

const usuariosRegistrados = []

const validarCorreo = (email) => email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

/* GET lista de usuarios */
router.get('/', function(req, res, next) {
  res.send(usuariosRegistrados);
});

/* POST registrar nuevo usuario */
router.post('/', function(req, res, next) {
  try {
    const usuarioExistente = usuariosRegistrados.find(usuario => usuario.userEmail === req.body.userEmail);

    if (!req.body.userName) return res.status(400).send({ error: 'El nombre es requerido' })
    if (!req.body.userEmail) return res.status(400).send({ error: 'El email es requerido' })
    if (!req.body.userAge) return res.status(400).send({ error: 'La edad es requerida' })
    if (req.body.userAge < 0) return res.status(400).send({ error: 'La edad debe ser mayor o igual a cero' })
    if (!validarCorreo(req.body.userEmail)) return res.status(400).send({ error: 'El correo no es valido' })

    if (usuarioExistente !== undefined) return res.status(400).send({ error: 'Usuario ya registrado' })

    usuariosRegistrados.push(req.body)

    return res.status(201).send({ message: 'Usuario guardado exitosamente' })
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error' })
  }
})

module.exports = router;
