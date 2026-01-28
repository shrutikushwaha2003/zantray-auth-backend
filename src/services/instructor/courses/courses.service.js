import Course from "../../../models/instructor/courses.model.js";
import Module from "../../../models/instructor/module.model.js";
import Lesson from "../../../models/instructor/lesson.model.js";
import CustomError from "../../../utils/CustomError.js";

class CourseService {
  static async createCourse(data, instructorId) {
    const course = await Course.create({
      ...data,
      instructorId,
      status: "draft",
    });

    return course;
  }

  static async getInstructorCourses(instructorId, search) {
    const filter = { instructorId };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    return await Course.find(filter).sort({ createdAt: -1 });
  }

  static async updateCourse(courseId, instructorId, data) {
    const course = await Course.findOneAndUpdate(
      { _id: courseId, instructorId },
      data,
      { new: true, runValidators: true }
    );

    if (!course) {
      throw new CustomError("Course not found or unauthorized", 404);
    }

    return course;
  }

  static async deleteCourse(courseId, instructorId) {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      instructorId,
    });

    if (!course) {
      throw new CustomError("Course not found or unauthorized", 404);
    }

    const modules = await Module.find({ courseId });

    for (let module of modules) {
      await Lesson.deleteMany({ moduleId: module._id });
    }

    await Module.deleteMany({ courseId });

    return course;
  }

  static async getCourseStats(instructorId) {
    const totalCourses = await Course.countDocuments({ instructorId });
    const published = await Course.countDocuments({
      instructorId,
      status: "published",
    });
    const drafts = await Course.countDocuments({
      instructorId,
      status: "draft",
    });

    return { totalCourses, published, drafts };
  }

  static async getFullCourseTree(courseId, instructorId) {
    const course = await Course.findOne({
      _id: courseId,
      instructorId,
    }).lean();

    if (!course) {
      throw new CustomError("Course not found or unauthorized", 404);
    }

    const modules = await Module.find({
      courseId,
      instructorId,
    }).sort({ order: 1 }).lean();

    for (let module of modules) {
      const lessons = await Lesson.find({
        moduleId: module._id,
        instructorId,
      }).sort({ order: 1 }).lean();

      module.lessons = lessons;
    }

    course.modules = modules;

    return course;
  }

  static async publishCourse(courseId, instructorId) {
    const course = await Course.findOne({
      _id: courseId,
      instructorId,
    });

    if (!course) {
      throw new CustomError("Course not found or unauthorized", 404);
    }

    if (!course.thumbnail) {
      throw new CustomError("Thumbnail is required before publishing", 400);
    }

    const modules = await Module.find({ courseId });

    if (modules.length === 0) {
      throw new CustomError("Add at least one module before publishing", 400);
    }

    for (let module of modules) {
      const lessons = await Lesson.find({ moduleId: module._id });

      if (lessons.length === 0) {
        throw new CustomError("Each module must have at least one lesson", 400);
      }
    }

    course.status = "published";
    await course.save();

    return course;
  }
}

export default CourseService;
