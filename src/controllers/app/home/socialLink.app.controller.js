import * as socialLinkAppService from "../../../services/app/home/socialLinks.app.service.js";
import { successResponse , errorResponse} from "../../../utils/response.utils.js";

export const getSocialLink =async(req,res)=>{
    try{
        const data =await socialLinkAppService.getSocialLinkForApp();
        return successResponse(res,{data});
    }catch(err){
        return errorResponse(res,err);
    }
};
