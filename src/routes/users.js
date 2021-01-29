const router = require('express').Router();

router.get('/user/signin', (req, res) => {
    res.send('Ingresando a la app');
});

router.get('/user/signup', (req, res) => {
    res.send('Formulario de autenticacion');
});

module.exports = router;