import {
  getCustomizerService,
  updateCustomizerService
} from "../../../services/instructor/customizer/customizer.service.js";

import uploadFileToS3 from "../../../utils/s3.utils.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* ================= GET CUSTOMIZER ================= */

export const getCustomizer = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const data = await getCustomizerService(instructorId);

    return successResponse(res, {
      message: "Success",
      data
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};


/* ================= UPDATE BRANDING ================= */

export const updateBranding = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const updateData = {};

    if (req.body.platformName) {
      updateData["branding.platformName"] = req.body.platformName;
    }

    if (req.body.tagline) {
      updateData["branding.tagline"] = req.body.tagline;
    }

    if (req.body.description) {
      updateData["branding.description"] = req.body.description;
    }

    if (req.files?.logo?.[0]) {
      const logoUrl = await uploadFileToS3(req.files.logo[0]);
      updateData["branding.logoUrl"] = logoUrl;
    }

    if (req.files?.banner?.[0]) {
      const bannerUrl = await uploadFileToS3(req.files.banner[0]);
      updateData["branding.bannerUrl"] = bannerUrl;
    }

    const updated = await updateCustomizerService(
      instructorId,
      updateData
    );

    return successResponse(res, {
      message: "Branding updated successfully",
      data: updated
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};


/* ================= UPDATE COLORS ================= */

export const updateColors = async (req, res) => {
  

  try {
    const instructorId = req.user.id;
    const updateData = {};

    if (req.body.primaryColor) {
      updateData["colors.primaryColor"] = req.body.primaryColor;
    }

    if (req.body.secondaryColor) {
      updateData["colors.secondaryColor"] = req.body.secondaryColor;
    }

    if (req.body.fontFamily) {
      updateData["colors.fontFamily"] = req.body.fontFamily;
    }


    const updated = await updateCustomizerService(
      instructorId,
      updateData
    );

    return successResponse(res, {
      message: "Colors updated successfully",
      data: updated
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};


/* ================= UPDATE LAYOUT ================= */

export const updateLayout = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const updateData = {
      "layout.featuredCourses": req.body.featuredCourses === "true" || req.body.featuredCourses === true,
      "layout.communitySection": req.body.communitySection === "true" || req.body.communitySection === true,
      "layout.testimonials": req.body.testimonials === "true" || req.body.testimonials === true
    };

    const updated = await updateCustomizerService(
      instructorId,
      updateData
    );

    return successResponse(res, {
      message: "Layout updated successfully",
      data: updated
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};
