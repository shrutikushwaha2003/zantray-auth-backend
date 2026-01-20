import Team from "../../../models/about/teamModel.js";
import CustomError from "../../../utils/CustomError.js";

/* CREATE TEAM */
export const createTeam = async (data, adminId) => {
  try {
    const member = await Team.create({
      ...data,
      createdBy: adminId,
    });

    return member;
  } catch (err) {
    console.error("[TeamService] createTeam error:", err);
    throw err;
  }
};

/* GET ALL TEAM MEMBERS */
export const getTeams = async () => {
  try {
    const members = await Team.find({ isActive: true })
      .sort({ order: 1 })
      .select("-__v");

    return members;
  } catch (err) {
    console.error("[TeamService] getTeams error:", err);
    throw err;
  }
};

/* GET TEAM BY ID */
export const getTeamById = async (id) => {
  try {
    const member = await Team.findOne({ _id: id, isActive: true });

    if (!member) throw new CustomError("Team member not found", 404);

    return member;
  } catch (err) {
    console.error("[TeamService] getTeamById error:", err);
    throw err;
  }
};

/* UPDATE TEAM MEMBER */
export const updateTeam = async (id, data, adminId) => {
  try {
    const updated = await Team.findOneAndUpdate(
      { _id: id, isActive: true },
      { ...data, updatedBy: adminId },
      { new: true }
    );

    if (!updated) throw new CustomError("Team member not found", 404);

    return updated;
  } catch (err) {
    console.error("[TeamService] updateTeam error:", err);
    throw err;
  }
};

/* DELETE (SOFT DELETE) TEAM MEMBER */
export const deleteTeam = async (id) => {
  try {
    const deleted = await Team.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!deleted) throw new CustomError("Team member not found", 404);

    return { success: true };
  } catch (err) {
    console.error("[TeamService] deleteTeam error:", err);
    throw err;
  }
};
