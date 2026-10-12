let express = require('express');
const { 
    clientLogin, 
    createClient, 
    getprofile, 
    editProfile, 
    deleteProfile 
} = require('../../controller/servieces/client/clientauthController');
const { verifyToken } = require('../../middleware/verifyToken');
const upload = require('../../config/multer.config');

let clientAuthRoutes = express.Router();

// Public routes
clientAuthRoutes.post('/register', createClient);
clientAuthRoutes.post('/login', clientLogin);

// Protected routes (require token)
clientAuthRoutes.get('/view-profile', verifyToken, getprofile);
clientAuthRoutes.get('/view-profile/:id', verifyToken, getprofile);
clientAuthRoutes.put('/update-profile/:id', verifyToken, upload.single('profileImg'), editProfile);
clientAuthRoutes.delete('/delete-profile/:id', verifyToken, deleteProfile);

module.exports = { clientAuthRoutes };
