import Lesson from "../../../models/instructor/lesson.model.js";
import Module from "../../../models/instructor/module.model.js";
import CustomError from "../../../utils/CustomError.js";

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

  if (!data.title || !data.order) {
    throw new CustomError("Title and order are required", 400);
  }
  
  const totalVideos = await Lesson.countDocuments({
    moduleId,
    instructorId,
  });

  if (totalVideos >= 10) {
    throw new CustomError("Maximum 10 videos allowed per module", 400);
  }


  const existing = await Lesson.findOne({
    moduleId,
    instructorId,
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

export const getLessonsByModuleService = async (
  moduleId,
  instructorId
) => {
  return await Lesson.find({
    moduleId,
    instructorId,
  }).sort({ order: 1 });
};

export const updateLessonService = async (
  lessonId,
  instructorId,
  data
) => {
  const lesson = await Lesson.findOne({
    _id: lessonId,
    instructorId,
  });

  if (!lesson) {
    throw new CustomError("Lesson not found or unauthorized", 404);
  }

  if (data.order) {
    const existing = await Lesson.findOne({
      moduleId: lesson.moduleId,
      instructorId,
      order: data.order,
      _id: { $ne: lessonId },
    });

    if (existing) {
      throw new CustomError("Lesson order already exists", 400);
    }
  }

  Object.assign(lesson, data);
  await lesson.save();

  return lesson;
};

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
