import {
  createLessonService,
  getLessonsByModuleService,
  updateLessonService,
  deleteLessonService,
} from "../../../services/instructor/lesson/lesson.service.js";

import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import  uploadFileToS3  from "../../../utils/s3.utils.js";

export const createLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;

    if (!req.file) {
      return errorResponse(res, { message: "Video file is required" });
    }

    const videoUrl = await uploadFileToS3(req.file);

    const lesson = await createLessonService(
      courseId,
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


/* ================= GET BY COURSE ================= */
export const getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lectures = await getLessonsByModuleService(courseId);

    return successResponse(res, {
      message: "Lesson fetched successfully",
      data: lectures,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};


/* ================= UPDATE ================= */
export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    let videoUrl;

    if (req.file) {
      const key = `lesson/${Date.now()}-${req.file.originalname}`;
      const uploadResult = await uploadFileToS3(req.file, key);
      videoUrl = uploadResult.Location;
    }

    const updatedLesson = await updateLessonService(
      id,
      instructorId,
      {
        ...req.body,
        ...(videoUrl && { videoUrl }),
      }
    );

    return successResponse(res, {
      message: "Lesson updated successfully",
      data: updatedLesson,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};


/* ================= DELETE ================= */
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
