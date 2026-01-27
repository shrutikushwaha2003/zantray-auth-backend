import {
  createLectureService,
  getLecturesByCourseService,
  updateLectureService,
  deleteLectureService,
} from "../../../services/instructor/lecture/lecture.service.js";

import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import  uploadFileToS3  from "../../../utils/s3.utils.js";

export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;

    if (!req.file) {
      return errorResponse(res, { message: "Video file is required" });
    }

    const videoUrl = await uploadFileToS3(req.file);

    const lecture = await createLectureService(
      courseId,
      {
        ...req.body,
        videoUrl,
      },
      instructorId
    );

    return successResponse(res, {
      message: "Lecture created successfully",
      data: lecture,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};


/* ================= GET BY COURSE ================= */
export const getLecturesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lectures = await getLecturesByCourseService(courseId);

    return successResponse(res, {
      message: "Lectures fetched successfully",
      data: lectures,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};


/* ================= UPDATE ================= */
export const updateLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    let videoUrl;

    if (req.file) {
      const key = `lectures/${Date.now()}-${req.file.originalname}`;
      const uploadResult = await uploadFileToS3(req.file, key);
      videoUrl = uploadResult.Location;
    }

    const updatedLecture = await updateLectureService(
      id,
      instructorId,
      {
        ...req.body,
        ...(videoUrl && { videoUrl }),
      }
    );

    return successResponse(res, {
      message: "Lecture updated successfully",
      data: updatedLecture,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};


/* ================= DELETE ================= */
export const deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    await deleteLectureService(id, instructorId);

    return successResponse(res, {
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
