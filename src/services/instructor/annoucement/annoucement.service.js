import Announcement from "../../../models/instructor/annoucement.model.js";
import CustomError from "../../../utils/CustomError.js";

export const createAnnouncementService = async (data, userId) => {
  return await Announcement.create({
    ...data,
    createdBy: userId,
  });
};

export const getAnnouncementsService = async () => {
  return await Announcement.find()
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });
};

export const updateAnnouncementService = async (id, userId, data) => {
  const announcement = await Announcement.findOneAndUpdate(
    { _id: id, createdBy: userId },
    data,
    { new: true, runValidators: true }
  );

  if (!announcement) {
    throw new CustomError("Announcement not found or unauthorized", 404);
  }

  return announcement;
};

export const deleteAnnouncementService = async (id, userId) => {
  const announcement = await Announcement.findOneAndDelete({
    _id: id,
    createdBy: userId,
  });

  if (!announcement) {
    throw new CustomError("Announcement not found or unauthorized", 404);
  }

  return announcement;
};
