import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import * as howItWorkService from "../../../services/app/home/howItWorks.app.service.js";

export const getContent = async (req, res) => {
  try {
    const data = await howItWorkService.getHowItWorksForApp();
    return successResponse(res, { data });
  } catch (err) {
    return errorResponse(res, err);
  }
};
