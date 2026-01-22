import {
  createCourseService,
  getInstructorCoursesService,
  deleteCourseService,
} from "../../../../services/instructor/courses/course.service.js";

export const createCourse = async (req, res, next) => {
  try {
    const instructorId = req.user.id;

    const course = await createCourseService(req.body, instructorId);

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const getInstructorCourses = async (req, res, next) => {
  try {
    const instructorId = req.user.id;

    const courses = await getInstructorCoursesService(instructorId);

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    await deleteCourseService(id, instructorId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
