import Lecture from "../../../models/instructor/lecture.model.js";
import Course from "../../../models/instructor/courses.model.js";
import CustomError from "../../../utils/CustomError.js";

/* Create Lecture */
export const createLectureService = async (courseId, data, instructorId) => {
  const course = await Course.findOne({ _id: courseId, instructorId });
  if (!course) {
    throw new CustomError("Course not found or unauthorized", 404);
  }

  const lecture = await Lecture.create({
    ...data,
    courseId,
    instructorId,
  });

  return lecture;
};


/* Get Lectures by Course */
export const getLecturesByCourseService = async (courseId) => {
  return await Lecture.find({ courseId })
    .sort({ order: 1 });
};


/* Update Lecture */
export const updateLectureService = async (lectureId, instructorId, data) => {
  const lecture = await Lecture.findOneAndUpdate(
    { _id: lectureId, instructorId },
    data,
    { new: true }
  );

  if (!lecture) {
    throw new CustomError("Lecture not found or unauthorized", 404);
  }

  return lecture;
};


/* Delete Lecture */
export const deleteLectureService = async (lectureId, instructorId) => {
  const lecture = await Lecture.findOneAndDelete({
    _id: lectureId,
    instructorId,
  });

  if (!lecture) {
    throw new CustomError("Lecture not found or unauthorized", 404);
  }

  return lecture;
};
