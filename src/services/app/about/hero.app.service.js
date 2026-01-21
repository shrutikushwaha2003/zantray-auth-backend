import aboutHero from "../../../models/about/aboutHero.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getHeroForApp =async ()=>{
    try{
        const hero =await aboutHero.findOne({ isActive:true}).select("-createdBy -updatedBy -__v");//remove admin feilds
        if(!hero){
            throw new CustomError("Hero section not found",404);
        }
        return hero;

    }
    catch(err){
        throw err;
    }
};