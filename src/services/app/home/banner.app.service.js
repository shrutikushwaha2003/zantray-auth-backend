import homeBanner from "../../../models/home/banner.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getBannerForApp =async ()=>{
    try{
        const banner =await homeBanner.findOne({ isActive:true}).select("-createdBy -updatedBy -__v");//remove admin feilds
        if(!banner){
            throw new CustomError("Hero section not found",404);
        }
        return banner;

    }
    catch(err){
        throw err;
    }
};