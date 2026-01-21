import * as storyAppService from "../../../services/app/about/story.app.service.js";
import {successResponse,errorResponse} from "../../../utils/response.utils.js";

export const getStory = async(req, res)=> {
    try {
        const data = await storyAppService.getStoryForApp();
        return successResponse(res, { data });

    } catch (err) {
        return errorResponse(res, { data });

    }
};