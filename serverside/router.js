const {Router}=require('express');
const rh=require('./requestHandler.js');
const multer=require('multer');
const storage=multer.diskStorage({
    destination:"./uploads",
    filename:function(req,file,cb){
        const uniquesuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,uniquesuffix+"-"+file.originalname);
    }
})
const upload=multer({storage});
const router=Router();
router.route("/adduser").post(upload.single('file'),rh.addUser);
// router.route("/adduser").post(upload.array('file'),rh.addUser);
router.route("/getusers").get(rh.getUsers);
router.route("/image/:filename").get(rh.loadImage);
router.route("/delete/:_id").delete(rh.deleteUser);
router.route("/edit/:_id").put(rh.updateUser);


module.exports=router;
