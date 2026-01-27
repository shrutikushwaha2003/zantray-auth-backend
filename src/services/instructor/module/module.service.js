import Module from "../../../models/instructor/module.model.js";
import Course from "../../../models/instructor/courses.model.js";
import CustomError from "../../../utils/CustomError.js";

/* Create Module */
export const createModuleService = async (courseId, data, instructorId) => {
  const course = await Course.findOne({ _id: courseId, instructorId });

  if (!course) {
    throw new CustomError("Course not found or unauthorized", 404);
  }

  const module = await Module.create({
    ...data,
    courseId,
    instructorId,
  });

  return module;
};

/* Get Modules By Course */
export const getModulesByCourseService = async (courseId) => {
  return await Module.find({ courseId }).sort({ order: 1 });
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

  return module;
};
