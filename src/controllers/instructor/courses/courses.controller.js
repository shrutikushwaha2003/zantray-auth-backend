import CourseService from "../../../services/instructor/courses/courses.service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import uploadFileToS3 from "../../../utils/s3.utils.js";

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

    const course = await CourseService.createCourse(courseData, instructorId);

    return successResponse(res, {
      message: "Course created successfully",
      data: course,
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const search = req.query.search || "";

    const courses = await CourseService.getInstructorCourses(instructorId, search);

    return successResponse(res, { data: courses });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getFullCourseTree = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    const course = await CourseService.getFullCourseTree(id, instructorId);

    return successResponse(res, { data: course });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    let updateData = { ...req.body };

    if (req.file) {
      updateData.thumbnail = await uploadFileToS3(req.file);
    }

    const updatedCourse = await CourseService.updateCourse(
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

export const publishCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    const course = await CourseService.publishCourse(id, instructorId);

    return successResponse(res, {
      message: "Course published successfully",
      data: course,
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    await CourseService.deleteCourse(id, instructorId);

    return successResponse(res, {
      message: "Course deleted successfully",
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getCourseStats = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const stats = await CourseService.getCourseStats(instructorId);

    return successResponse(res, { data: stats });
  } catch (err) {
    return errorResponse(res, err);
  }
};
