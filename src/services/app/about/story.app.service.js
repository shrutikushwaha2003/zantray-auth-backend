import aboutStory from "../../../models/about/story.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getStoryForApp =async ()=>{
    try{
        const story =await aboutStory.findOne({ isActive:true}).select("-createdBy -updatedBy -isActive -__v");
        if(!story){
            throw new CustomError("Story section not found",404);
        }
        return story;

    }catch(err){
        throw err;
    }
};