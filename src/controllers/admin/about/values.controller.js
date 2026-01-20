import * as valuesService from "../../../services/admin/about/values.service.js";
import { validationResult } from "express-validator";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* SECTION UPSERT */
export const upsertSection = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, { message: errors.array()[0].msg, statusCode: 400 });
    }

    const data = await valuesService.upsertSection(req.body, req.user.id);
    return successResponse(res, { message: "Values section saved", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* GET SECTION */
export const getSection = async (req, res) => {
  try {
    const data = await valuesService.getSection();
    return successResponse(res, { data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* CREATE MULTIPLE ITEMS */
export const createItems = async (req, res) => {
  try {
    const items = req.body.items;
    const data = await valuesService.createItems(items, req.user.id);
    return successResponse(res, { message: "Values created", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* GET ALL ITEMS */
export const getItems = async (req, res) => {
  try {
    const data = await valuesService.getItems();
    return successResponse(res, { data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* UPDATE ITEM */
export const updateItem = async (req, res) => {
  try {
    const data = await valuesService.updateItem(req.params.id, req.body, req.user.id);
    return successResponse(res, { message: "Value updated", data });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* DELETE ITEM */
export const deleteItem = async (req, res) => {
  try {
    await valuesService.deleteItem(req.params.id);
    return successResponse(res, { message: "Value deleted" });
  } catch (err) {
    return errorResponse(res, err);
  }
};
