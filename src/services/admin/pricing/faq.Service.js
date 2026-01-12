import Faq from "../../../models/pricing /faqModel.js";
import CustomError from "../../../utils/CustomError.js";

/* CREATE (multiple) */
export const createFaq = async (items, adminId) => {
  try {
    if (!Array.isArray(items) || items.length === 0) {
      throw new CustomError("FAQ list required", 400);
    }

    const payload = items.map(i => ({
      ...i,
      createdBy: adminId
    }));

    const createdFaqs = await Faq.insertMany(payload);
    return createdFaqs;

  } catch (err) {
    console.error("createFaq error:", err);
    throw err;
  }
};

/* GET ALL */
export const getAllFaqs = async () => {
  try {
    return await Faq.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  } catch (err) {
    console.error("getAllFaqs error:", err);
    throw err;
  }
};

/* GET BY ID */
export const getFaqById = async (id) => {
  try {
    const faq = await Faq.findById(id);
    if (!faq) throw new CustomError("FAQ not found", 404);
    return faq;

  } catch (err) {
    console.error("getFaqById error:", err);
    throw err;
  }
};

/* UPDATE */
export const updateFaq = async (id, data, adminId) => {
  try {
    const faq = await Faq.findByIdAndUpdate(
      id,
      { ...data, updatedBy: adminId, updatedOn: new Date() },
      { new: true }
    );

    if (!faq) throw new CustomError("FAQ not found", 404);
    return faq;

  } catch (err) {
    console.error("updateFaq error:", err);
    throw err;
  }
};

/* DELETE */
export const deleteFaq = async (id) => {
  try {
    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) throw new CustomError("FAQ not found", 404);
    return true;

  } catch (err) {
    console.error("deleteFaq error:", err);
    throw err;
  }
};
