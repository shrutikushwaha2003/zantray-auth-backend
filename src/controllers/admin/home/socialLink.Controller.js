import * as service from "../../../services/admin/home/socialLink.Service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* CREATE */
export const createSocialLink = async (req, res) => {
  try {
    const result = await service.createLinks(req.body, req.user._id);
    return successResponse(res, { message: "Link created", data: result });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* GET ALL (ADMIN) */
export const getSocialLinks = async (req, res) => {
  try {
    const result = await service.getLinks();
    return successResponse(res, { data: result });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* UPDATE */
export const updateSocialLink = async (req, res) => {
  try {
    const result = await service.updateLink(req.params.id, req.body, req.user._id);
    return successResponse(res, { message: "Updated", data: result });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* DELETE */
export const deleteSocialLink = async (req, res) => {
  try {
    await service.deleteLink(req.params.id);
    return successResponse(res, { message: "Deleted" });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* PUBLIC */
export const getPublicSocialLinks = async (req, res) => {
  try {
    const result = await service.getPublicLinks();
    return successResponse(res, { data: result });
  } catch (err) {
    return errorResponse(res, err);
  }
};
