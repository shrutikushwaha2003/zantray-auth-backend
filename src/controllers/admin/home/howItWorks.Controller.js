import * as howItWorksService from "../../../services/admin/home/howItWorks.Services.js";

/* ===== ADMIN ===== */

// SECTION
export const saveSection = async (req, res) => {
  const section = await howItWorksService.upsertSection(
    req.body,
    req.user._id
  );

  res.json({ success: true, data: section });
};

// STEPS
export const createStep = async (req, res) => {
  const step = await howItWorksService.createStep(
    req.body,
    req.user.id 
  );

  res.json({ success: true, data: step });
};

export const getStepsAdmin = async (req, res) => {
  const steps = await howItWorksService.getSteps();
  res.json({ success: true, data: steps });
};

export const updateStep = async (req, res) => {
  const step = await howItWorksService.updateStep(
    req.params.id,
    req.body,
    req.user._id
  );

  res.json({ success: true, data: step });
};

export const deleteStep = async (req, res) => {
  await howItWorksService.deleteStep(req.params.id);
  res.json({ success: true, message: "Step deleted successfully" });
};

/* ===== PUBLIC ===== */

export const getHowItWorks = async (req, res) => {
  const section = await howItWorksService.getSection();
  const steps = await howItWorksService.getSteps();

  res.json({
    success: true,
    data: {
      section,
      steps,
    },
  });
};

