import * as bannerAppService from "../../../services/app/home/banner.app.service.js";
import { successResponse , errorResponse} from "../../../utils/response.utils.js";

export const getbanner =async(req,res)=>{
    try{
        const data =await bannerAppService.getBannerForApp();
        return successResponse(res,{data});
    }catch(err){
        return errorResponse(res,err);
    }
};
