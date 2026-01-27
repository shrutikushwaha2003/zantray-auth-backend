import {
  createFeedService,
  getFeedsService,
  updateFeedService,
  deleteFeedService,
} from "../../../services/instructor/feed/feed.service.js";

import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* Create */
export const createFeed = async (req, res) => {
  try {
    const userId = req.user.id;

    const feed = await createFeedService(req.body, userId);

    return successResponse(res, {
      message: "Feed created successfully",
      data: feed,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* Get All */
export const getFeeds = async (req, res) => {
  try {
    const feeds = await getFeedsService();

    return successResponse(res, {
      message: "Feeds fetched successfully",
      data: feeds,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* Update */
export const updateFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const updatedFeed = await updateFeedService(id, userId, req.body);

    return successResponse(res, {
      message: "Feed updated successfully",
      data: updatedFeed,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/* Delete */
export const deleteFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await deleteFeedService(id, userId);

    return successResponse(res, {
      message: "Feed deleted successfully",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
