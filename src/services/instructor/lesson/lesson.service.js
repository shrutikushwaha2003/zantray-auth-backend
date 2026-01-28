import Lesson from "../../../models/instructor/lesson.model.js";
import Module from "../../../models/instructor/module.model.js";
import CustomError from "../../../utils/CustomError.js";

/* Create Lesson */
export const createLessonService = async (
  moduleId,
  data,
  instructorId
) => {
  const module = await Module.findOne({
    _id: moduleId,
    instructorId,
  });

  if (!module) {
    throw new CustomError("Module not found or unauthorized", 404);
  }

  const existing = await Lesson.findOne({
    moduleId,
    order: data.order,
  });

  if (existing) {
    throw new CustomError("Lesson order already exists", 400);
  }

  const lesson = await Lesson.create({
    ...data,
    moduleId,
    courseId: module.courseId,
    instructorId,
  });

  return lesson;
};

/* Get Lessons by Module */
export const getLessonsByModuleService = async (
  moduleId,
  instructorId
) => {
  return await Lesson.find({
    moduleId,
    instructorId,
  }).sort({ order: 1 });
};

/* Update Lesson */
export const updateLessonService = async (
  lessonId,
  instructorId,
  data
) => {
  const lesson = await Lesson.findOneAndUpdate(
    { _id: lessonId, instructorId },
    data,
    { new: true, runValidators: true }
  );

  if (!lesson) {
    throw new CustomError("Lesson not found or unauthorized", 404);
  }

  return lesson;
};

/* Delete Lesson */
export const deleteLessonService = async (
  lessonId,
  instructorId
) => {
  const lesson = await Lesson.findOneAndDelete({
    _id: lessonId,
    instructorId,
  });

  if (!lesson) {
    throw new CustomError("Lesson not found or unauthorized", 404);
  }

  return lesson;
};
