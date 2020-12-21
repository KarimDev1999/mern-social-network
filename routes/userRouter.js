const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');




router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

});

router.put('/update', async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate({ _id: req.body.userId }, { name: 'updatedQWEwithID' });
        if (user) return res.json({ msg: 'user field was successfuly updated' })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }

});

router.put('/status', async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate({ _id: req.body.userId }, { status: req.body.status });
        if (user) return res.json({ msg: 'status was successfuly updated' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
})


router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id);
    const profileOwner = await User.findById(req.userId);
    const isOwner = profileOwner.id === user.id;
    return res.json({ user, isOwner });

})


router.post('/register', async (req, res) => {
    try {
        let { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json('all fields must be filled')
        }

        if (password.length < 5) {
            return res.status(400).json('password needs to be at least 5 characters')
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json('user with this email already exists');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            avatar: 'defaultAvatar.jpg'
        });
        const savedUser = await newUser.save();

        res.json({ user: savedUser, msg: 'you have successfully created an account ' })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'you need too pass all required fields' });
        }

        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ msg: 'wrong password or email, please try again' });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.SECRET_JWT_ACCESS_TOKEN,
            { expiresIn: '1h' }
        );
        return res.json({ msg: 'you have successfuly logged in', accessToken, user })
    }

    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.post("/tokenIsValid", auth, async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        console.log(await User.findById(req.userId));

        return res.json({ auth: true, user });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.put('/upload', auth, async (req, res) => {

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/../public/uploads/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

    });
    const user = await User.findByIdAndUpdate({ _id: req.userId }, { avatar: file.name });
    res.json({ msg: 'your avatar was successfuly changed', avatar: file.name });
});



module.exports = router;