import * as faqAppService from "../../../services/app/pricing/faq.app.service.js";
import { successResponse , errorResponse} from "../../../utils/response.utils.js";

export const getFaq =async(req,res)=>{
    try{
        const data =await faqAppService.getFAQForApp();
        return successResponse(res,{data});
    }catch(err){
        return errorResponse(res,err);
    }
};
