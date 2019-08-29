const multer = require('multer');
const cloudinary = require('cloudinary');

const userImageStorage = multer.diskStorage({
    filename: function(req, file, cd) {
        cd(null, Date.now()+'-'+ file.originalname)
    }
    
});

const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

cloudinary.config({ 
    cloud_name: 'dopyweyej', 
    //api_key: process.env.CLOUDINARY_API_KEY, 
    //api_secret: process.env.CLOUDINARY_API_SECRET
    api_key:'261354169182463',
    api_secret:'LsmKDWI-Y1ivqCcRVKVnLF86Z4s'
});

const userImageUpload = multer({ storage: userImageStorage, fileFilter: imageFilter });

// module.exports.userImageUpload2=(req, res, next)=>{
//     console.log("uploadUserImage")
//     const userId = req.params.userId;
//     User
//         .find({ _id: userId })
//         .exec()
//         .then(user => {
//             console.log("user found")
//             cloudinary.uploader.upload(req.file.path, function(result) {
//                 imageSecureURL = result.secure_url;
//                 console.log(imageSecureURL)
//                 user[0].imageURL = imageSecureURL;
//                 user[0]
//                     .save()
//                     .then(result => {
//                         res.status(200).json({
//                             state: true
//                         }) 
//                     })
//             });
//         })
//         .catch(err => {
//             res.status(401).json({
//                 state: false
//             })
//         })
// };

module.exports = {
    userImageUpload: userImageUpload
};