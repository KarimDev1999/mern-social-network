const router = require('express').Router();
const Post = require('../models/posts');
const User = require('../models/users');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
    const posts = await Post.find().populate("postedBy", "")
    return res.json(posts)
})

router.post('/', auth, async (req, res) => {
    try {
        let { text } = req.body;

        const user = await User.findById({ _id: req.userId })
        const newPost = new Post({
            text,
            postedBy: user
        });

        const savedPost = await newPost.save();
        return res.json({ msg: 'post was successfuly created', savedPost })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: 'post was successfuly deleted' });
});


module.exports = router;