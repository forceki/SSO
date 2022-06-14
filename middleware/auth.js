import jwt from 'jsonwebtoken';

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

export const authenticationCheck=(req,res,next)=>{
    const auth=req.headers.authorization;
    if(auth === undefined){
        res.status(401).send({
            "status":0  
        });
        return
    }
    const authSplit=auth.split(" ");
    if(authSplit.length < 2){
        res.status(401).send({
            "status":0
        });
        return
    }
    const token=authSplit[1]
    jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
        if(err){
            res.status(401).send({
                "status":0,
                "message":err
            })
            return
        }
        res.locals.user=decoded
        next()
    });
}