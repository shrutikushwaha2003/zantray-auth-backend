import * as heroAppService from "../../../services/app/about/hero.app.service.js";
import { successResponse , errorResponse} from "../../../utils/response.utils.js";

export const getHero =async(req,res)=>{
    try{
        const data =await heroAppService.getHeroForApp();
        return successResponse(res,{data});
    }catch(err){
        return errorResponse(res,{data});
    }
};
