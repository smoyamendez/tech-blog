const router = require('express').Router();
const { Post } = require('../../models');
const authGood = require('../../utils/auth');

// CREATE NEW POST
router.post('/', authGood, async (req, res) => {
    console.log(req.session.user_id);
    try {
        const newPost = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id,
        });
        console.log(req.body);
        res.status(200).json(newPost);
    } catch (err) {
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

// UPDATE POST
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(
            req.body, 
            {
                where: {
                    id: req.params.id,
                }
            });
            res.json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;