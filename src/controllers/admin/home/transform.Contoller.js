import * as heroService from "../../../services/admin/home/tranform.Service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

export const createHero = async (req, res) => {
  try {
    const result = await heroService.createHero(req.body, req.user.id);
    successResponse(res, { message: "Hero created successfully", data: result });
  } catch (err) {
    errorResponse(res, err);
  }
};

export const getHeroesAdmin = async (req, res) => {
  try {
    const result = await heroService.getHeroes();
    successResponse(res, { data: result });
  } catch (err) {
    errorResponse(res, err);
  }
};

export const updateHero = async (req, res) => {
  try {
    const result = await heroService.updateHero(req.params.id, req.body, req.user._id);
    successResponse(res, { message: "Hero updated successfully", data: result });
  } catch (err) {
    errorResponse(res, err);
  }
};

export const deleteHero = async (req, res) => {
  try {
    await heroService.deleteHero(req.params.id);
    successResponse(res, { message: "Hero deleted successfully" });
  } catch (err) {
    errorResponse(res, err);
  }
};
