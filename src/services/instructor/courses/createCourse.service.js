import mongoose from "mongoose";
import Course from "../../../models/instructor/createCourse.model.js";
import Module from "../../../models/instructor/module.model.js";
import Lesson from "../../../models/instructor/lesson.model.js";
import CustomError from "../../../utils/CustomError.js";

class CourseService {
  static async createCourse(data, instructorId) {
    try {
      const { modules = [], ...courseData } = data;

      const course = await Course.create({
        ...courseData,
        instructorId,
        status: "draft",
      });

      for (const moduleItem of modules) {
        const { lessons = [], ...moduleData } = moduleItem;

        const module = await Module.create({
          ...moduleData,
          courseId: course._id,
          instructorId,
        });

        for (const lessonItem of lessons) {
          await Lesson.create({
            ...lessonItem,
            courseId: course._id,
            moduleId: module._id,
            instructorId,
          });
        }
      }

      return course;

    } catch (error) {
      throw new CustomError("Failed to create course with modules and lessons", 500);
    }


  }


  static async getInstructorCourses(instructorId, search) {
    try {
      const filter = { instructorId };

      if (search) {
        filter.title = { $regex: search, $options: "i" };
      }

      return await Course.find(filter).sort({ createdAt: -1 });

    } catch (error) {
      throw new CustomError("Failed to fetch courses", 500);
    }
  }

  static async updateCourse(courseId, instructorId, data) {
    try {
      const course = await Course.findOneAndUpdate(
        { _id: courseId, instructorId },
        data,
        { new: true, runValidators: true }
      );

      if (!course) {
        throw new CustomError("Course not found or unauthorized", 404);
      }

      return course;

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError("Failed to update course", 500);
    }
  }

  static async deleteCourse(courseId, instructorId) {
    try {
      const course = await Course.findOneAndDelete({
        _id: courseId,
        instructorId,
      });

      if (!course) {
        throw new CustomError("Course not found or unauthorized", 404);
      }

      const modules = await Module.find({ courseId });

      for (const module of modules) {
        await Lesson.deleteMany({ moduleId: module._id });
      }

      await Module.deleteMany({ courseId });

      return course;

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError("Failed to delete course", 500);
    }
  }

  static async getCourseStats(instructorId) {
    try {
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

    } catch (error) {
      throw new CustomError("Failed to fetch course stats", 500);
    }
  }

  static async getFullCourseTree(courseId, instructorId) {
    try {
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

      for (const module of modules) {
        const lessons = await Lesson.find({
          moduleId: module._id,
          instructorId,
        }).sort({ order: 1 }).lean();

        module.lessons = lessons;
      }

      course.modules = modules;

      return course;

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError("Failed to fetch course details", 500);
    }
  }

  static async publishCourse(courseId, instructorId) {
    try {
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

      for (const module of modules) {
        const lessons = await Lesson.find({ moduleId: module._id });

        if (lessons.length === 0) {
          throw new CustomError("Each module must have at least one lesson", 400);
        }
      }

      course.status = "published";
      await course.save();

      return course;

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError("Failed to publish course", 500);
    }
  }
}

export default CourseService;
