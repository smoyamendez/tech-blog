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

// GET /login



module.exports = router;