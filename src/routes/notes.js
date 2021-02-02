const router = require('express').Router();
const Note = require('../models/Note');

router.get('/notes', async (req, res) => {
    const notes = await Note.find({}).sort({date: 'desc'}).lean();
    res.render('notes/all-notes', { notes });
});

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please Write a Title'})
    }
    if(!description){
        errors.push({text: 'Please Write a Description'})
    }
    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        })
    } else {
        const newNote = new Note({ title, description });
        await newNote.save();
        res.redirect('/notes');
    }
});

router.get('/notes/edit/:id', async (req, res) => {
    console.log(req.params);
    const note = await Note.findById(req.params.id).lean();
    console.log(note);
    res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description}).lean();
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
    console.log(req.params.id);
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
});

module.exports = router;