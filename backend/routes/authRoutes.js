const express = require('express');
const {protect} = require('../middleware/authMiddleware'); 
const upload = require('../middleware/uploadMiddleware');

const {
    registerUser,
    loginUser,
    getUserInfo,

}= require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login',loginUser);

router.get('/getUser',protect,getUserInfo);

router.post('/upload-image', upload.single("image"), (req, res) => {
        if(!req.file){
        console.log("No file uploaded");
        return res.status(400).json({message:"No file uploaded"});
    }
    const imageurl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
    }`;
    console.log(imageurl)
    res.status(200).json({imageurl})
})

module.exports = router;