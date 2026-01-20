import Story from "../../../models/about/story.model.js";
import CustomError from "../../../utils/CustomError.js";

/* CREATE STORY (only once) */
export const createStory = async (data, adminId) => {
  try {
    const existing = await Story.findOne({ isActive: true });
    if (existing) {
      throw new CustomError("Story already exists. Please update instead.", 400);
    }

    const story = await Story.create({
      ...data,
      createdBy: adminId,
      isActive: true
    });

    return story;
  } catch (err) {
    console.error("[StoryService] createStory error:", err);
    throw err;
  }
};

/* GET STORY */
export const getStory = async () => {
  try {
    const story = await Story.findOne({ isActive: true });
    return story;
  } catch (err) {
    console.error("[StoryService] getStory error:", err);
    throw err;
  }
};

/* UPDATE STORY (preserve images) */
export const updateStory = async (data, adminId) => {
  try {
    const existing = await Story.findOne({ isActive: true });

    if (!existing) {
      throw new CustomError("Story not found.", 404);
    }

    // preserve images if not provided
    const images = {
      topLeft: data.images?.topLeft || existing.images?.topLeft,
      topRight: data.images?.topRight || existing.images?.topRight,
      bottom: data.images?.bottom || existing.images?.bottom,
    };

    const updated = await Story.findByIdAndUpdate(
      existing._id,
      {
        ...data,
        images,
        updatedBy: adminId
      },
      { new: true }
    );

    return updated;
  } catch (err) {
    console.error("[StoryService] updateStory error:", err);
    throw err;
  }
};

/* SOFT DELETE STORY */
export const deleteStory = async () => {
  try {
    const existing = await Story.findOne({ isActive: true });

    if (!existing) {
      throw new CustomError("Story not found.", 404);
    }

    await Story.findByIdAndUpdate(existing._id, { isActive: false });

    return { success: true };
  } catch (err) {
    console.error("[StoryService] deleteStory error:", err);
    throw err;
  }
  
};
