import aboutTeam from "../../../models/about/teamModel.js";

export const getTeamForApp = async () => {
  try {
    const team = await aboutTeam.find({ isActive: true })
      .sort({ order: 1 })
      .select("-createdBy -updatedBy -isActive -__v");

    return team || [];
  } catch (err) {
    throw err;
  }
};
