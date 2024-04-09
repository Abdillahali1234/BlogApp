const mongoose = require("mongoose");

const confirmObjectId=(req,res,next) => {

    const id=req.params.id;
    if(!mongoose.isValidObjectId(id)){

        return res.status(400).json({
            message:"Invalid ObjectId"
        })
    }

    next();

}


module.exports=confirmObjectId;