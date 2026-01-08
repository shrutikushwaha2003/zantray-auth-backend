import * as service from "../../../services/admin/home/features.Services.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* ===== ADMIN ===== */

export const saveSection = async (req, res) => {
  try {
    const section = await service.upsertSection(req.body, req.user._id);

    return successResponse(res, {
      message: "Section saved successfully",
      data: section
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

export const createItem = async (req, res) => {
  try {
    const items = await service.createItems(req.body, req.user._id);

    return successResponse(res, {
      message: "Items created successfully",
      statusCode: 201,
      data: items
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getItemsAdmin = async (req, res) => {
  try {
    const items = await service.getItems();

    return successResponse(res, {
      data: items
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await service.updateItem(req.params.id, req.body, req.user._id);

    return successResponse(res, {
      message: "Item updated successfully",
      data: item
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteItem = async (req, res) => {
  try {
    await service.deleteItem(req.params.id);

    return successResponse(res, {
      message: "Item deleted successfully"
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

/* ===== PUBLIC ===== */

export const getFeatures = async (req, res) => {
  try {
    const section = await service.getSection();
    const items = await service.getItems();

    return successResponse(res, {
      data: { section, items }
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};
