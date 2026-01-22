import Course from "../../../../models/course.model.js";

export const createCourseService = async (data, instructorId) => {
  const course = await Course.create({
    ...data,
    instructorId,
  });

  return course;
};

export const getInstructorCoursesService = async (instructorId) => {
  return await Course.find({ instructorId }).sort({ createdAt: -1 });
};

export const deleteCourseService = async (courseId, instructorId) => {
  return await Course.findOneAndDelete({
    _id: courseId,
    instructorId,
  });
};
