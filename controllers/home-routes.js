const router = require('express').Router();
const { Post, Comment } = require('../models');

// /dashboard
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findall({
            
        })
    }
})
// /signup
router.get('/signup', (req, res) => {
    
})

// GET /login
router.get('/login', (req, res) => {
    // if user already logged in => redirect to dashboard
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});


module.exports = router;