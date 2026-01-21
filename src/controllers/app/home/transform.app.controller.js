import * as transformAppService from "../../../services/app/home/transform.app.service.js";
import { successResponse , errorResponse} from "../../../utils/response.utils.js";

export const getTransformSection =async(req,res)=>{
    try{
        const data =await transformAppService.getTransformForApp();
        return successResponse(res,{data});
    }catch(err){
        return errorResponse(res,err);
    }
};
