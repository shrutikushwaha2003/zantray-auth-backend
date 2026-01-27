import {
  createCourseService,
  getInstructorCoursesService,
  updateCourseService,
  deleteCourseService,
  getCourseStatsService,
} from "../../../services/instructor/courses/courses.service.js";

import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import uploadFileToS3 from "../../../utils/s3.utils.js";


/* ================= CREATE COURSE ================= */
export const createCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;

    let thumbnailUrl = null;

    if (req.file) {
      thumbnailUrl = await uploadFileToS3(req.file);
    }

    const courseData = {
      ...req.body,
      thumbnail: thumbnailUrl,
    };

    const course = await createCourseService(courseData, instructorId);

    return successResponse(res, {
      message: "Course created successfully",
      data: course,
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};


/* ================= GET COURSES ================= */
export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const search = req.query.search || "";

    const courses = await getInstructorCoursesService(instructorId, search);

    return successResponse(res, { data: courses });

  } catch (err) {
    return errorResponse(res, err);
  }
};


/* ================= UPDATE COURSE ================= */
export const updateCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    let updateData = { ...req.body };

    if (req.file) {
      updateData.thumbnail = await uploadFileToS3(req.file);
    }

    const updatedCourse = await updateCourseService(
      id,
      instructorId,
      updateData
    );

    return successResponse(res, {
      message: "Course updated successfully",
      data: updatedCourse,
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};


/* ================= DELETE COURSE ================= */
export const deleteCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    await deleteCourseService(id, instructorId);

    return successResponse(res, {
      message: "Course deleted successfully",
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};


/* ================= COURSE STATS ================= */
export const getCourseStats = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const stats = await getCourseStatsService(instructorId);

    return successResponse(res, { data: stats });

  } catch (err) {
    return errorResponse(res, err);
  }
};
