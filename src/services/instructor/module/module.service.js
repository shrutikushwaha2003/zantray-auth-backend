import Module from "../../../models/instructor/module.model.js";
import Course from "../../../models/instructor/createCourse.model.js";
import Lesson from "../../../models/instructor/lesson.model.js";
import CustomError from "../../../utils/CustomError.js";

/* Create Module */
export const createModuleService = async (courseId, data, instructorId) => {
  const course = await Course.findOne({ _id: courseId, instructorId });

  if (!course) {
    throw new CustomError("Course not found or unauthorized", 404);
  }

  const existing = await Module.findOne({
    courseId,
    order: data.order,
  });

  if (existing) {
    throw new CustomError("Module order already exists", 400);
  }

  const module = await Module.create({
    ...data,
    courseId,
    instructorId,
  });

  return module;
};

/* Get Modules By Course */
export const getModulesByCourseService = async (
  courseId,
  instructorId
) => {
  return await Module.find({
    courseId,
    instructorId,
  }).sort({ order: 1 });
};

/* Delete Module */
export const deleteModuleService = async (id, instructorId) => {
  const module = await Module.findOneAndDelete({
    _id: id,
    instructorId,
  });

  if (!module) {
    throw new CustomError("Module not found or unauthorized", 404);
  }

  await Lesson.deleteMany({ moduleId: module._id });

  return module;
};
