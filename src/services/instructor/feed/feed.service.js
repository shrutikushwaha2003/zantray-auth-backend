import Feed from "../../../models/instructor/feed.model.js";
import CustomError from "../../../utils/CustomError.js";

/* Create Feed */
export const createFeedService = async (data, userId) => {
  try {
    const feed = await Feed.create({
      ...data,
      createdBy: userId,
    });

    return feed;
  } catch (error) {
    throw error;
  }
};

/* Get All Feeds */
export const getFeedsService = async () => {
  try {
    const feeds = await Feed.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    return feeds;
  } catch (error) {
    throw error;
  }
};

/* Update Feed */
export const updateFeedService = async (feedId, userId, data) => {
  try {
    const feed = await Feed.findOneAndUpdate(
      { _id: feedId, createdBy: userId },
      data,
      { new: true }
    );

    if (!feed) {
      throw new CustomError("Feed not found or unauthorized", 404);
    }

    return feed;
  } catch (error) {
    throw error;
  }
};

/* Delete Feed */
export const deleteFeedService = async (feedId, userId) => {
  try {
    const feed = await Feed.findOneAndDelete({
      _id: feedId,
      createdBy: userId,
    });

    if (!feed) {
      throw new CustomError("Feed not found or unauthorized", 404);
    }

    return feed;
  } catch (error) {
    throw error;
  }
};
