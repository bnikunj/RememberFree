var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Nikunjisagoodb$oy';

const fetchuser  {req, res, nex}=>{
    //Get the user from the jwt token and add id  to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    const string = jwt.verify(token, JWT_SECRET)
    next()

}

module.exports = fetchuser;