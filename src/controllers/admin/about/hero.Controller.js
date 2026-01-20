import * as heroService from "../../../services/admin/about/hero.service.js";
import uploadToS3 from "../../../utils/s3.utils.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

export const createHero = async (req, res) => {
  try {
    let payload = { ...req.body };
    if (req.file) payload.image = await uploadToS3(req.file, "about/hero");

    const data = await heroService.createHero(payload, req.user.id);
    return successResponse(res, { message: "Hero created", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getHero = async (req, res) => {
  try {
    const data = await heroService.getHero();
    return successResponse(res, { data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateHero = async (req, res) => {
  try {
    let payload = { ...req.body };
    if (req.file) payload.image = await uploadToS3(req.file, "about/hero");

    const data = await heroService.updateHero(payload, req.user.id);
    return successResponse(res, { message: "Hero updated", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteHero = async (req, res) => {
  try {
    await heroService.deleteHero(req.user.id);
    return successResponse(res, { message: "Hero deleted" });
  } catch (err) {
    return errorResponse(res, err);
  }
};
