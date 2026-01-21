import FeaturesSection from "../../../models/home/feauresSection.model.js";
import FeaturesItem from "../../../models/home/featuresItem.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getFeaturesForApp = async () => {
  try {
    const section = await FeaturesSection.findOne({ isActive: true });

    if (!section) {
      throw new CustomError("Features section not found", 404);
    }

    const items = await FeaturesItem.find({ isActive: true }).sort({ order: 1 });

    return {
      smallTitle: section.smallTitle,
      mainTitle: section.mainTitle,
      description: section.description || null,
      items: items.map(item => ({
        icon: item.icon,
        title: item.title,
        subtitle: item.subtitle,
        link: item.link || null
      }))
    };

  } catch (err) {
    
    throw err;
  }
};
