import Announcement from "../../../models/instructor/annocement.model.js";
import CustomError from "../../../utils/CustomError.js";

/* Create */
export const createAnnouncementService = async (data, userId) => {
  try {
    return await Announcement.create({
      ...data,
      createdBy: userId,
    });
  } catch (error) {
    throw error;
  }
};

/* Get All */
export const getAnnouncementsService = async () => {
  try {
    return await Announcement.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });
  } catch (error) {
    throw error;
  }
};

/* Update */
export const updateAnnouncementService = async (id, userId, data) => {
  try {
    const announcement = await Announcement.findOneAndUpdate(
      { _id: id, createdBy: userId },
      data,
      { new: true }
    );

    if (!announcement) {
      throw new CustomError("Announcement not found or unauthorized", 404);
    }

    return announcement;
  } catch (error) {
    throw error;
  }
};

/* Delete */
export const deleteAnnouncementService = async (id, userId) => {
  try {
    const announcement = await Announcement.findOneAndDelete({
      _id: id,
      createdBy: userId,
    });

    if (!announcement) {
      throw new CustomError("Announcement not found or unauthorized", 404);
    }

    return announcement;
  } catch (error) {
    throw error;
  }
};
