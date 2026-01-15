import * as milestoneService from "../../../services/admin/about/milestone.service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

export const upsertSection = async (req, res) => {
  try {
    const data = await milestoneService.upsertSection(req.body, req.user.id);
    return successResponse(res, { message: "Section saved", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const createItems = async (req, res) => {
  try {
    const data = await milestoneService.createItems(req.body.items, req.user.id);
    return successResponse(res, { message: "Items created", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getAll = async (req, res) => {
  try {
    const section = await milestoneService.getSection();
    const items = await milestoneService.getItems();
    return successResponse(res, { data: { section, items } });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateItem = async (req, res) => {
  try {
    const data = await milestoneService.updateItem(req.params.id, req.body, req.user.id);
    return successResponse(res, { message: "Item updated", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteItem = async (req, res) => {
  try {
    await milestoneService.deleteItem(req.params.id);
    return successResponse(res, { message: "Item deleted" });
  } catch (err) {
    return errorResponse(res, err);
  }
};
