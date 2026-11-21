async function gard (req,res,next){
    if(req.headers.authorization == 12345678){
        next();
    }else{
        return res.json({
            success : false,
            message : 'Not Authorization'
        });
    };
};
module.exports = gard;