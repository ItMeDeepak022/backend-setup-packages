let express=require('express');
const { adminAuthRoutes } = require('./admin/adminRoute');
const { clientAuthRoutes } = require('./client/clientRoute');

let authRoute=express.Router();

authRoute.use('/admin',adminAuthRoutes)
authRoute.use('/client',clientAuthRoutes)
  


module.exports={authRoute}