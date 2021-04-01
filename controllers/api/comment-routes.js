const router = require('express').Router();
const { Comment } = require('../../models');

// CREATE NEW COMMENT
router.post('/', authGood, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE COMMENT
router.delete('/:id', authGood, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id, //MAY NEED TO ADD MODEL STUFF
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment with this id.' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE COMMENT
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(
            req.body, 
            {
                where: {
                    id: req.params.id,
                }
            });
            res.json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;