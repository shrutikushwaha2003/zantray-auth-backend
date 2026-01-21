import HowItWorksSection from "../../../models/home/howItWorksSection.model.js";
import HowItWorksStep from "../../../models/home/howItWorksStep.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getHowItWorksForApp = async () => {
    try {
        const section = await HowItWorksSection.findOne({ isActive: true });

        if (!section) {
            throw new CustomError("How It Works section not found", 404);
        }

        const steps = await HowItWorksStep.find({ isActive: true })
            .sort({ order: 1 });

        return {
            smallTitle: section.smallTitle,
            mainTitle: section.mainTitle,
            description: section.description,
            steps: steps.map((step) => ({
                step: step.stepNumber,
                title: step.title,
                description: step.description,
                icon: step.icon
            }))
        };

    } catch (err) {

        throw err;
    }
};
