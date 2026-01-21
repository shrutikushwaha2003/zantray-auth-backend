import Transform from "../../../models/home/transform.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getTransformForApp = async () => {
  try {
    const transform = await Transform.findOne({ isActive: true })
      .select("-createdBy -updatedBy -__v");

    if (!transform) {
      throw new CustomError("Transform section not found", 404);
    }

    return {
      title: transform.title,
      subtitle: transform.subtitle,
      description: transform.description,
      image: transform.image
    };

  } catch (err) {
    console.error("[TransformAppService] Error:", err);
    throw err;
  }
};
