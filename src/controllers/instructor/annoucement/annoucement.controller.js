import {
  createAnnouncementService,
  getAnnouncementsService,
  updateAnnouncementService,
  deleteAnnouncementService,
} from "../../../services/instructor/annoucement/annoucement.service.js";

import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import uploadFileToS3 from "../../../utils/s3.utils.js";

/* Create */
export const createAnnouncement = async (req, res) => {
  try {
    const userId = req.user.id;

    let imageUrl = null;

    if (req.files && req.files.image) {
      imageUrl = await uploadFileToS3(req.files.image[0]);
    }

    const data = {
      ...req.body,
      image: imageUrl,
    };

    const announcement = await createAnnouncementService(data, userId);

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

    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = await uploadFileToS3(req.file);
    }

    const updatedAnnouncement = await updateAnnouncementService(
      id,
      userId,
      updateData
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
