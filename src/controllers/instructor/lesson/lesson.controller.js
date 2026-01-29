import {
  createLessonService,
  getLessonsByModuleService,
  updateLessonService,
  deleteLessonService,
} from "../../../services/instructor/lesson/lesson.service.js";

import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import uploadFileToS3 from "../../../utils/s3.utils.js";

export const createLesson = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const instructorId = req.user.id;

    if (!req.file) {
      return errorResponse(res, { message: "Video file is required" });
    }

    const videoUrl = await uploadFileToS3(req.file);

    const lesson = await createLessonService(
      moduleId,
      {
        ...req.body,
        videoUrl,
      },
      instructorId
    );

    return successResponse(res, {
      message: "Lesson created successfully",
      data: lesson,
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getLessonsByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const instructorId = req.user.id;

    const lessons = await getLessonsByModuleService(
      moduleId,
      instructorId
    );

    return successResponse(res, {
      message: "Lessons fetched successfully",
      data: lessons,
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    let updateData = { ...req.body };

    if (req.file) {
      const videoUrl = await uploadFileToS3(req.file);
      updateData.videoUrl = videoUrl;
    }

    const lesson = await updateLessonService(
      id,
      instructorId,
      updateData
    );

    return successResponse(res, {
      message: "Lesson updated successfully",
      data: lesson,
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    await deleteLessonService(id, instructorId);

    return successResponse(res, {
      message: "Lesson deleted successfully",
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};
