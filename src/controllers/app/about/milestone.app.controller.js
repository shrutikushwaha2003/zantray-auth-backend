import * as milestoneService from "../../../services/app/about/milestone.app.service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

export const getMilestone = async (req, res) => {
  try {
    const data = await milestoneService.getMilestoneForApp();

    return successResponse(res, {
      message: "Milestone retrieved successfully",
      data
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};
