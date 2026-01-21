import * as valueAppService from "../../../services/app/about/values.app.service.js";
import {successResponse,errorResponse} from "../../../utils/response.utils.js";

export const getValue = async(req, res)=> {
    try {
        const data = await valueAppService.getValuesForApp();
        return successResponse(res, { data });

    } catch (err) {
        return errorResponse(res, err);

    }
};