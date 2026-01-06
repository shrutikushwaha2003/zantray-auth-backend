import * as bannerService from "../../../services/admin/home/homePage.service";
import { successResponse,errorResponse } from "../../../utils/response.utils";

export const createBanner = async (req, res) => {
  try {
    const banner = await bannerService.createBanner(req.body);
    return successResponse(res, { message: "Banner created", data: banner });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getBanners = async (req, res) => {
  try {
    const banners = await bannerService.getAllBanner();
    return successResponse(res, { data: banners });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getBanner = async (req, res) => {
  try {
    const banner = await bannerService.getBannerById(req.params.id);
    return successResponse(res, { data: banner });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await bannerService.updateBanner(req.params.id, req.body);
    return successResponse(res, { message: "Banner updated", data: banner });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteBanner = async (req, res) => {
  try {
    await bannerService.deleteBanner(req.params.id);
    return successResponse(res, { message: "Banner deleted" });
  } catch (err) {
    return errorResponse(res, err);
  }
};
