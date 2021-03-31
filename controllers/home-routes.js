const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const authGood = require('../utils/auth');

router.get('/', authGood, async (req, res) => {
    try {
        const postData = await Post.findall({
            include: [
                {
                    model: Comment,
                    attributes: ['text', 'comment-date'],
                },
            ],
        });
        const posts = JSON.parse(JSON.stringify(postData));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

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
// // /signup
// router.get('/signup', (req, res) => {

// });

// // /dashboard
// router.get('/dashboard', (req, res) => {

// });

// GET /login
router.get('/login', (req, res) => {
    // if user already logged in => redirect to dashboard
    // console.log(req.session);
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


module.exports = router;