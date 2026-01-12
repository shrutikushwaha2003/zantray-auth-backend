import * as faqService from "../../../services/admin/pricing/faq.Service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

export const createFaq = async (req, res) => {
  try {
    const { items } = req.body; // MUST match

    const faqs = await faqService.createFaq(items, req.user.id);

    return successResponse(res, {
      message: "FAQ created",
      data: faqs
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};


export const getFaqs = async (req, res) => {
  try {
    const faqs = await faqService.getAllFaqs();
    successResponse(res, { data: faqs });
  } catch (e) {
    errorResponse(res, e);
  }
};

export const updateFaq = async (req, res) => {
  try {
    const faq = await faqService.updateFaq(req.params.id, req.body, req.user.id);
    successResponse(res, { message: "FAQ updated", data: faq });
  } catch (e) {
    errorResponse(res, e);
  }
};

export const deleteFaq = async (req, res) => {
  try {
    await faqService.deleteFaq(req.params.id);
    successResponse(res, { message: "FAQ deleted" });
  } catch (e) {
    errorResponse(res, e);
  }
};
