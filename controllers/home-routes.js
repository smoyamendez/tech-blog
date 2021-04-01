const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const authGood = require('../utils/auth');

router.get('/', authGood, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User, 
                    attributes: ["name"]
                },
            ],
        });
        const posts = JSON.parse(JSON.stringify(postData));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET POST BY ID
// router.get('/post/:id', async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: Comment,
//                     attributes: ['text', 'comment-date'],
//                 },
//             ],
//         });

//         const posts = JSON.parse(JSON.stringify(postData));
//         // FIXME: 
//         res.render('posts', { post, })
//     }
// })

// /dashboard
// router.get('/dashboard', authGood, (req, res) => {
    
    // });
    
    // /signup
    router.get('/signup', (req, res) => {
        // if user already logged in => redirect to dashboard
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }
    
        res.render('signup');
    });

// GET /login
router.get('/login', (req, res) => {
    // if user already logged in => redirect to dashboard
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});



module.exports = router;