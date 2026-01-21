import aboutValues from "../../../models/about/valueSection.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getValuesForApp =async ()=>{
    try{
        const value =await aboutValues.findOne({ isActive:true}).select("-createdBy -updatedBy -__v");//remove admin feilds
        if(!value){
            throw new CustomError("value section not found",404);
        }
        return value;

    }
    catch(err){
        throw err;
    }
};