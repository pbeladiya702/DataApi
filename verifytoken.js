const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    const token=req.header('auth-token');
    if(!token){
        res.send('no token found');
    }else{
        try {
            jwt.verify(token,'privatekey');
            next()

        } catch (error) {
            res.send(error).status(404);
        }
    }

}