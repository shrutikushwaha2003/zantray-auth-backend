import SocialLinks from "../../../models/home/socialLink.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getSocialLinkForApp = async () => {
  try {
    const socialLinks = await SocialLinks.find({ isActive: true })
      .sort({ order: 1 })
      .select("-createdBy -updatedBy -__v");

    if (!socialLinks || socialLinks.length === 0) {
      throw new CustomError("Social links not found", 404);
    }

    return socialLinks;
  } catch (err) {
    console.error("[SocialLinkAppService] Error:", err);
    throw err;
  }
};
