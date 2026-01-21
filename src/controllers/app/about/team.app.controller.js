import * as teamAppService from "../../../services/app/about/team.app.service.js";
import {successResponse,errorResponse} from "../../../utils/response.utils.js";

export const getTeam = async(req, res)=> {
    try {
        const data = await teamAppService.getTeamForApp();
        return successResponse(res, { data });

    } catch (err) {
        return errorResponse(res, err);

    }
};