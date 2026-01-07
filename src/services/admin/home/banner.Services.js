import Banner from "../../../models/home/banner.model.js";
import CustomError from "../../../utils/CustomError.js";


export const createBanner = async (data, adminId) => {
  return await Banner.create({
    ...data,
    createdBy: adminId,   
  });
};


export const getAllBanner=async()=>{
    return await Banner.find().sort({order:1,createdAt:-1});
}

export const getBannerById=async(id)=>{
    const banner =await Banner.findById(id);
    if(!banner) throw new CustomError("Banner not found ",404);
    return banner;
}

export const updateBanner=async(id,data)=>{
    const banner =await Banner.findByIdAndUpdate(id,data,{new:true});

    if(!banner) throw new CustomError("Banner not found",404);
    return banner;
}

export const deleteBanner=async(id,data)=>{
    const banner=await Banner.findByIdAndDelete(id,data,{new:true});

    if(!banner) throw new CustomError("Banner not found",404);
    return banner;
}