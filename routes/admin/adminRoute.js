let express = require('express');
const { createAdmin, adminLogin } = require('../../controller/servieces/admin/adminauthController');
 

let adminAuthRoutes = express();

adminAuthRoutes.post('/create',createAdmin);
adminAuthRoutes.post('/login',adminLogin);


module.exports = { adminAuthRoutes };
