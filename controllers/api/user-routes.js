const router = require('express').Router();
const { User } = require('../../models');


// CREATE new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// CREATE login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again!'});
            return;
        }
        
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again!'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;
            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!'});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// CREATE logout
router.post('/logout', (req, res) => {
    // destroys session when user logs out
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            req.logout();
            res.redirect('/login');
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
