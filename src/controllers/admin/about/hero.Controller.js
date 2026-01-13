import * as heroService from "../../../services/admin/about/hero.service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

export const createHero = async (req, res) => {
  try {
    const data = await heroService.createHero(req.body, req.user.id);
    return successResponse(res, { message: "Hero Created", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getHeroes = async (req, res) => {
  try {
    const data = await heroService.getAllHeroes();
    return successResponse(res, { data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getHero = async (req, res) => {
  try {
    const data = await heroService.getHeroById(req.params.id);
    return successResponse(res, { data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateHero = async (req, res) => {
  try {
    const data = await heroService.updateHero(req.params.id, req.body, req.user.id);
    return successResponse(res, { message: "Hero Updated", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteHero = async (req, res) => {
  try {
    await heroService.deleteHero(req.params.id);
    return successResponse(res, { message: "Hero Deleted" });
  } catch (err) {
    return errorResponse(res, err);
  }
};
