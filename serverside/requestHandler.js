const User = require('./models/multer.model');

async function addUser(req, res) {
    try {
        
        console.log(req.body);
        console.log(req.files);
        const files = req.files;
        const { username, email, phone } = req.body;
        const data = await User.create({ username, email, phone, files });

        res.status(200).send({ data });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to add user' });
    }
}

module.exports = { addUser };