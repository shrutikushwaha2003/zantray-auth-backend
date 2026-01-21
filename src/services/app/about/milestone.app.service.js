import MilestoneSection from "../../../models/about/milestoneSection.model.js";
import MilestoneItem from "../../../models/about/milestoneItems.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getMilestoneForApp = async () => {
    try {
        const section = await MilestoneSection.findOne({ isActive: true });

        if (!section) {
            throw new CustomError("Milestone section not found", 404);
        }

        const items = await MilestoneItem.find({
            
            isActive: true
        }).sort({ year: 1 });

        console.log("Items:", items); // debugging output

        return {
            title: section.heading,       // frontend title
            subtitle: section.label,      // frontend subtitle
            items: items.map(item => ({
                year: item.year,
                label: item.title,
                description: item.description
            }))
        };

    } catch (err) {
        console.error("[MilestoneAppService] Error:", err);
        throw err;
    }
};
