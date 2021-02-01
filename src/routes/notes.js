const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('Notes from database');
});

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

module.exports = router;