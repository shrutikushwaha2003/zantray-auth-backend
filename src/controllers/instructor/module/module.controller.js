import {
  createModuleService,
  getModulesByCourseService,
  deleteModuleService,
} from "../../../services/instructor/module/module.service.js";

import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* Create Module */
export const createModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;

    const module = await createModuleService(
      courseId,
      req.body,
      instructorId
    );

    return successResponse(res, {
      message: "Module created successfully",
      data: module,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* Get Modules */
export const getModulesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;

    const modules = await getModulesByCourseService(
      courseId,
      instructorId
    );

    return successResponse(res, {
      message: "Modules fetched successfully",
      data: modules,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};


/* Delete Module */
export const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    await deleteModuleService(id, instructorId);

    return successResponse(res, {
      message: "Module deleted successfully",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
