import DBConnection from "../db/connection.js";

export const createActivityLog=(message)=>{
    return function (req,res,next){
        const query=`
            INSERT INTO user_activity
            (endpoint,message,user_id)
            VALUES ?
        `
        const queryData=[
            req.url,
            res.locals.user.full_name+" "+message,
            res.locals.user.id
        ]
        DBConnection.query(query,[[queryData]],(err,result)=>{
            if(err){
                res.status(500).send({
                    status:0,
                    message:"Log Activity Not Working"
                })
            };
            next();
        })
    }
}