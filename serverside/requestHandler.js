const User = require('./models/multer.model');
const userSchema=require('./models/multer.model.js')
const fs=require('fs')
const path=require('path')
async function addUser(req, res) {
    try {
        
        console.log(req.body);
        console.log(req.file);
        const file = req.file;
        const { username, email, phone } = req.body;
        const data = await User.create({ username, email, phone, file });

        res.status(200).send({ data });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to add user' });
    }
}


async function getUsers(req,res){
    try{
        const users=await userSchema.find();
        res.status(200).send(users)

    }catch(error){
        console.log(error);
    }
}

async function loadImage(req,res){
    const {filename}=req.params;
    return res.sendFile(path.resolve(`./uploads/${filename}`))
}

async function deleteUser(req,res) {
    const {_id}=req.params;
    const user=await userSchema.findOne({_id});
    console.log(user);
    if(!user)
        return res.status(500).send({msg:"user not available"})

    //===================================================================
    //used for es6(import statement)
    //  const __filename=fileURLToPath(import.meta.url)
    //  const __dirname=path.dirname(__filename)
    //====================================================================
    //  console.log(__filename);
    console.log(__dirname);
    const fullpath=path.join(__dirname,"uploads",user.file.filename);
    await fs.unlink(fullpath,(error)=>{

    })
    await userSchema.deleteOne({_id}).then(()=>{
        res.status(200).send("success")
        

    }).catch((error)=>{
        res.status(500).send({error})
    })
}

async function updateUser(req,res) {
    const {_id}=req.params;
    const user=await userSchema.findOne({_id});
    res.status(200).send(user)
}
module.exports = { 
    addUser,
    getUsers,
    loadImage,
    deleteUser,
    updateUser
 };