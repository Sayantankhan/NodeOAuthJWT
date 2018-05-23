var dataSource = require('../datastore/data');
var config = require('../config/config');
var jwt = require('jsonwebtoken');

var express     = require('express');
var apiRouter      = express.Router();

    apiRouter.get("/",(req,res)=>{
        res.json({ message: 'server is up !!' });
    });

    apiRouter.post("/authorize",(req,res)=>{
        var user = dataSource.findUser(req.body.username,req.body.password);
        if(!user)
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        else{
            // create a token with only our given payload
            // we don't want to pass in the entire user since that has the password
            const payload = {
                admin: user.admin 
            };
            // generating the token
            var token = jwt.sign(payload, config.secret, {
                //algorithm: 'RS256'
            });
            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }
    });


    apiRouter.get("/users",(req,res)=>{
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function(err, decoded) {      
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });    
                } else {
                    // if everything is good, save to request for use in other routes
                    res.json(dataSource.fetchAllUser);
                }
            });
        }
        else {
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });  
        }
    })

    // route middleware to verify a token
    apiRouter.use(function(req,res,next){
    });

module.exports = apiRouter;