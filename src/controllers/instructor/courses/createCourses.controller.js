import CourseService from "../../../services/instructor/courses/createCourse.service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import uploadFileToS3 from "../../../utils/s3.utils.js";

export const createCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;

    let thumbnailUrl = null;
    let introVideoUrl = null;

    if (req.files?.thumbnail) {
      thumbnailUrl = await uploadFileToS3(req.files.thumbnail[0]);
    }

    if (req.files?.introVideo) {
      introVideoUrl = await uploadFileToS3(req.files.introVideo[0]);
    }

    let parsedModules = [];

    if (req.body.modules) {
      try {
        parsedModules = JSON.parse(req.body.modules);
      } catch (err) {
        return errorResponse(res, {
          message: "Invalid JSON format in modules field",
        });
      }
    }

    const courseData = {
      ...req.body,
      thumbnail: thumbnailUrl,
      introVideo: introVideoUrl,
      modules: parsedModules,
    };

    const course = await CourseService.createCourse(
      courseData,
      instructorId
    );

    return successResponse(res, {
      message: "Course created successfully",
      data: course,
    });

  } catch (error) {
    console.log("CREATE COURSE ERROR:", error);
    return errorResponse(res, error);
  }
};

export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const search = req.query.search || "";

    const courses = await CourseService.getInstructorCourses(
      instructorId,
      search
    );

    return successResponse(res, { data: courses });

  } catch (error) {
    return errorResponse(res, error);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    let updateData = { ...req.body };

    if (req.files?.thumbnail) {
      updateData.thumbnail = await uploadFileToS3(
        req.files.thumbnail[0]
      );
    }

    if (req.files?.introVideo) {
      updateData.introVideo = await uploadFileToS3(
        req.files.introVideo[0]
      );
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

  } catch (error) {
    return errorResponse(res, error);
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

  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getCourseStats = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const stats = await CourseService.getCourseStats(instructorId);

    return successResponse(res, { data: stats });

  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getFullCourseTree = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    const course = await CourseService.getFullCourseTree(
      id,
      instructorId
    );

    return successResponse(res, { data: course });

  } catch (error) {
    return errorResponse(res, error);
  }
};

export const publishCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { id } = req.params;

    const course = await CourseService.publishCourse(
      id,
      instructorId
    );

    return successResponse(res, {
      message: "Course published successfully",
      data: course,
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};
