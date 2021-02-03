const router = require('express').Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({user: req.user._id}).sort({date: 'desc'}).lean();
    res.render('notes/all-notes', { notes });
});

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
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
        newNote.user = req.user._id;
        console.log(newNote);
        await newNote.save();
        req.flash('success_msg', 'Notes Added Successfully');
        res.redirect('/notes');
    }
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    console.log(req.params);
    const note = await Note.findById(req.params.id).lean();
    console.log(note);
    res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description}).lean();
    req.flash('success_msg', 'Notes Updated Successfully');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    console.log(req.params.id);
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Notes Deleted Successfully');
    res.redirect('/notes');
});

module.exports = router;