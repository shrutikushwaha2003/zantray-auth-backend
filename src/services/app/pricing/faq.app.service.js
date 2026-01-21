import faqSection from "../../../models/pricing /faqModel.js";
import CustomError from "../../../utils/CustomError.js";

export const getFAQForApp = async () => {
  try {
    const faqList = await faqSection
      .find({ isActive: true })
      .sort({ order: 1, createdOn: -1 })
      .select("-createdBy -updatedBy -__v");

    if (!faqList || faqList.length === 0) {
      throw new CustomError("FAQ not found", 404);
    }

    return faqList;

  } catch (err) {
    console.error("[FAQAppService] Error:", err);
    throw err;
  }
};
