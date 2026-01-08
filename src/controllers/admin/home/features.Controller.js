import * as service from "../../../services/admin/home/features.Services.js";

/* ADMIN */
export const saveSection = async (req, res) => {
  const section = await service.upsertSection(req.body, req.user._id);
  res.json({ success: true, data: section });
};

export const createItem = async (req, res) => {
  const item = await service.createItems(req.body, req.user.id);
  res.json({ success: true, data: item });
};

export const getItemsAdmin = async (req, res) => {
  const items = await service.getItems();
  res.json({ success: true, data: items });
};

export const updateItem = async (req, res) => {
  const item = await service.updateItem(req.params.id, req.body, req.user._id);
  res.json({ success: true, data: item });
};

export const deleteItem = async (req, res) => {
  await service.deleteItem(req.params.id);
  res.json({ success: true, message: "Item deleted successfully" });
};

/* PUBLIC */
export const getFeatures = async (req, res) => {
  const section = await service.getSection();
  const items = await service.getItems();
  res.json({ success: true, data: { section, items } });
};
