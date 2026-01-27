import Course from "../../../models/instructor/courses.model.js";

export const createCourseService = async (data, instructorId) => {
  try {
    const course = await Course.create({
      ...data,
      instructorId,
    });
    return course;
  } catch (err) {
    throw err;
  }
};

export const getInstructorCoursesService = async (instructorId, search) => {
  try {
    const filter = { instructorId };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    return courses;
  } catch (err) {
    throw err;
  }
};


export const updateCourseService = async (courseId, instructorId, data) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: courseId, instructorId },
      data,
      { new: true }
    );

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  } catch (err) {
    throw err;
  }
};

export const deleteCourseService = async (courseId, instructorId) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      instructorId,
    });

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  } catch (err) {
    throw err;
  }
};


export const getCourseStatsService = async (instructorId) => {
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

    return {
      totalCourses,
      published,
      drafts,
    };
  } catch (err) {
    throw err;
  }
};
