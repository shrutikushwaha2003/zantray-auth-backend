import * as service from "../../../services/admin/home/hero.Service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* ===== ADMIN ===== */

export const saveHero = async (req, res) => {
  try {
    const result = await service.upsertHero(req.body, req.user._id);

    return successResponse(res, {
      message: "Hero section updated successfully",
      data: result,
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getHeroAdmin = async (req, res) => {
  try {
    const result = await service.getHeroAdmin();

    return successResponse(res, {
      data: result,
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

/* ===== PUBLIC ===== */

export const getHero = async (req, res) => {
  try {
    const result = await service.getHeroPublic();

    return successResponse(res, {
      data: result,
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};
