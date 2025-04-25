const User = require("../modals/user.modal");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

async function handleSignin(req, res) {
    const { name, email, password } = req.body;
    const saltRound = 10
    const user = req.user;
    if (user) {
        res.status(200).json({ msg: "authorized" })
    }
    if (name && email && password) {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                bcrypt.genSalt(saltRound, function (err, salt) {
                    bcrypt.hash(password, salt, async function (err, hash) {
                        const newUser = await User.create({ name, email, password: hash });
                        const token = generateToken({ _id: newUser._id, email: newUser.email, name: newUser.name })
                        res.json({ token: token })
                    })
                })
            } else {
                res.status(403).json({ msg: "Email already exist" })
            }
        } catch (error) {
            res.status(400).json({ msg: `Error : ${error}` })
        }
    } else {
        res.status(400).json({ msg: "All fields are required" })
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = req.user;
    if (user) {
        res.status(200).json({ msg: "authorized" })
    }
    if (email && password) {
        try {
            const user = await User.findOne({ email })
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = generateToken({ _id: user.id, name: user.name, email: user.email })
                    res.json({ token: token })
                } else {
                    res.status(401).json({ msg: "Incorrect username or password" })
                }
            } else {
                res.status(401).json({ msg: "Incorrect username or password" })
            }
        } catch (error) {
            res.status(403).json({ error: `Error ${error}` })
        }
    } else {
        res.status(400).json({ msg: "All fields are required" })
    }
}

async function handleCheckAuth(req, res) {
    const user = req.user
    if (user) {
        res.status(200).json({ msg: "authorized" })
    } else {
        res.status(401).json({ msg: "unauthorized" })
    }
}

module.exports = { handleLogin, handleSignin, handleCheckAuth }