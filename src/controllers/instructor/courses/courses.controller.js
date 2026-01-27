import {
  createCourseService,
  getInstructorCoursesService,
  updateCourseService,
  deleteCourseService,
  getCourseStatsService,
} from "../../../services/instructor/courses/courses.service.js";

import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* Create Course */
export const createCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const course = await createCourseService(req.body, instructorId);

    return successResponse(res, {
      message: "Course created successfully",
      data: course,
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Get Courses */
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

/* Update Course */
export const updateCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    const updatedCourse = await updateCourseService(
      id,
      instructorId,
      req.body
    );

    return successResponse(res, {
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Delete Course */
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

/* Course Stats */
export const getCourseStats = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const stats = await getCourseStatsService(instructorId);

    return successResponse(res, { data: stats });
  } catch (err) {
    return errorResponse(res, err);
  }
};
