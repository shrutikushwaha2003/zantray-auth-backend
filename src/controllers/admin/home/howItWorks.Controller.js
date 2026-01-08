import * as service from "../../../services/admin/home/howItWorks.Services.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* ===== ADMIN ===== */

// SECTION
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

// BULK STEPS CREATE
export const createStep= async (req, res) => {
  try {
    const steps = await service.createStepsBulk(req.body, req.user._id);

    return successResponse(res, {
      message: "Steps created successfully",
      statusCode: 201,
      data: steps
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getStepsAdmin = async (req, res) => {
  try {
    const steps = await service.getSteps();

    return successResponse(res, {
      data: steps
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateStep = async (req, res) => {
  try {
    const step = await service.updateStep(req.params.id, req.body, req.user._id);

    return successResponse(res, {
      message: "Step updated successfully",
      data: step
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteStep = async (req, res) => {
  try {
    await service.deleteStep(req.params.id);

    return successResponse(res, {
      message: "Step deleted successfully"
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

/* ===== PUBLIC ===== */

export const getHowItWorks = async (req, res) => {
  try {
    const section = await service.getSection();
    const steps = await service.getSteps();

    return successResponse(res, {
      data: { section, steps }
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};
