import * as storyService from "../../../services/admin/about/story.service.js";
import uploadFileToS3 from "../../../utils/s3.utils.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

export const createStory = async (req, res) => {
  try {
    const payload = await buildPayload(req);
    const story = await storyService.createStory(payload, req.user.id);

    return successResponse(res, { message: "Story created", data: story });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateStory = async (req, res) => {
  try {
    const payload = await buildPayload(req);
    const story = await storyService.updateStory(payload, req.user.id);

    return successResponse(res, { message: "Story updated", data: story });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getStory = async (req, res) => {
  try {
    const story = await storyService.getStory();
    return successResponse(res, { data: story });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteStory = async (req, res) => {
  try {
    await storyService.deleteStory();
    return successResponse(res, { message: "Story deleted" });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* ---------------------------
   Build Payload Helper
----------------------------*/
const buildPayload = async (req) => {
  let payload = { ...req.body };

  // convert paragraphs
  if (req.body.paragraphs) {
    payload.paragraphs = req.body.paragraphs.split("\n");
  }

  payload.images = payload.images || {};

  if (req.files?.topLeft) {
    payload.images.topLeft = await uploadFileToS3(req.files.topLeft[0], req);
  }

  if (req.files?.topRight) {
    payload.images.topRight = await uploadFileToS3(req.files.topRight[0], req);
  }

  if (req.files?.bottom) {
    payload.images.bottom = await uploadFileToS3(req.files.bottom[0], req);
  }

  return payload;
};
