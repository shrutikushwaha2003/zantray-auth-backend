import * as teamService from "../../../services/admin/about/team.service.js";
import uploadFileToS3 from "../../../utils/s3.utils.js";
import { successResponse, errorResponse } from "../../../utils/response.utils.js";

/* CREATE TEAM MEMBER */
export const createTeamMember = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image = await uploadFileToS3(req.file, req);
    }

    const created = await teamService.createTeam(payload, req.user.id);

    return successResponse(res, {
      message: "Team member created successfully",
      data: created
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

/* GET ALL TEAM MEMBERS */
export const getTeams = async (req, res) => {
  
  try {
    const list = await teamService.getTeams();

    return successResponse(res, {
      data: list
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

/* GET SINGLE TEAM MEMBER */
export const getTeamMember = async (req, res) => {
  try {
    const member = await teamService.getTeamById(req.params.id);

    return successResponse(res, {
      data: member
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

/* UPDATE TEAM MEMBER */
export const updateTeamMember = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image = await uploadFileToS3(req.file, req);
    }

    const updated = await teamService.updateTeam(req.params.id, payload, req.user.id);

    return successResponse(res, {
      message: "Team member updated successfully",
      data: updated
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};

/* DELETE TEAM MEMBER */
export const deleteTeamMember = async (req, res) => {
  try {
    const result = await teamService.deleteTeam(req.params.id);

    return successResponse(res, {
      message: "Team member deleted successfully",
      ...result
    });

  } catch (err) {
    return errorResponse(res, err);
  }
};
