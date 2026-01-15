import * as storyService from "../../../services/admin/about/story.service.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";
import { validationResult } from "express-validator";

export const createStory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, { message: errors.array()[0].msg, statusCode: 400 });
    }

    const story = await storyService.createStory(req.body, req.user.id);
    return successResponse(res, { message: "Story created", data: story });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getStories = async (req, res) => {
  try {
    const stories = await storyService.getStories();
    return successResponse(res, { data: stories });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getStory = async (req, res) => {
  try {
    const story = await storyService.getStoryById(req.params.id);
    return successResponse(res, { data: story });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateStory = async (req, res) => {
  try {
    const story = await storyService.updateStory(req.params.id, req.body, req.user.id);
    return successResponse(res, { message: "Story updated", data: story });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteStory = async (req, res) => {
  try {
    await storyService.deleteStory(req.params.id);
    return successResponse(res, { message: "Story deleted" });
  } catch (err) {
    return errorResponse(res, err);
  }
};
