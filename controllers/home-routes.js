const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const { restore } = require('../models/user');
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
router.get('/post/:id', authGood, async (req, res) => {
    try {
        const postData = await Post.findByPk( req.params.id,
            {
                
                include: [
                    {
                        model: User,
                    },
                    {
                        model: Comment
                    }
                ]
            });

        const posts = JSON.parse(JSON.stringify(postData));
        res.render('viewPost', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /dashboard
router.get('/dashboard', authGood, async (req, res) => {
    try {
        const dashboardData = await User.findByPk(req.session.user_id, {
            include: [{ model: Post }]
        });
        const dashboard = JSON.parse(JSON.stringify(dashboardData));
        console.log(dashboard);
        res.render('dashboard', {
            dashboard,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard/new', authGood, (req, res) => {
    try {
        res.render('newPost', {
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard/edit/:id', authGood, async (req, res) => {
    try {
        const dashboardData = await Post.findByPk(req.params.id);
        const posts = JSON.parse(JSON.stringify(dashboardData));
        res.render('edit', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

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