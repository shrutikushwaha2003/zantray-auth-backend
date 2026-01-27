import {
  createAnnouncementService,
  getAnnouncementsService,
  updateAnnouncementService,
  deleteAnnouncementService,
} from "../../../services/instructor/annoucement/annoucement.service.js";

import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* Create */
export const createAnnouncement = async (req, res) => {
  try {
    const userId = req.user.id;

    const announcement = await createAnnouncementService(req.body, userId);

    return successResponse(res, {
      message: "Announcement created successfully",
      data: announcement,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* Get All */
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await getAnnouncementsService();

    return successResponse(res, {
      message: "Announcements fetched successfully",
      data: announcements,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* Update */
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const updatedAnnouncement = await updateAnnouncementService(
      id,
      userId,
      req.body
    );

    return successResponse(res, {
      message: "Announcement updated successfully",
      data: updatedAnnouncement,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* Delete */
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await deleteAnnouncementService(id, userId);

    return successResponse(res, {
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
