const router = require('express').Router();
const { Post } = require('../../models');
const authGood = require('../utils/auth');

// CREATE NEW POST
router.post('/', authGood, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(400).json(err);
    }
});

// DELETE POST
router.delete('/:id', authGood, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id, //MAY NEED TO ADD MODEL STUFF
                user_id: req.session.user_id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with this id.' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;