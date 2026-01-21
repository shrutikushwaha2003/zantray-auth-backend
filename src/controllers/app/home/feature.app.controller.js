import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import * as featuresService from "../../../services/app/home/features.app.service.js";

export const getFeatures = async (req, res) => {
  try {
    const data = await featuresService.getFeaturesForApp();
    return successResponse(res, { data });
  } catch (err) {
    return errorResponse(res, err);
  }
};
