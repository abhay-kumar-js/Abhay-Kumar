import { DataStore } from '../utils/dataStore.js';

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const services = await DataStore.getServices();
    return res.status(200).json({
      success: true,
      message: 'Services fetched successfully',
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin)
export const createService = async (req, res, next) => {
  try {
    const { title, description, icon, features, order, active } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both title and description',
      });
    }

    const slug = req.body.slug ? generateSlug(req.body.slug) : generateSlug(title);

    const serviceData = {
      title: title.trim(),
      slug,
      description: description.trim(),
      icon: icon || 'Code2',
      features: Array.isArray(features)
        ? features
        : typeof features === 'string'
        ? features.split(',').map((f) => f.trim()).filter(Boolean)
        : [],
      order: Number(order) || 0,
      active: active !== undefined ? Boolean(active) : true,
    };

    const newService = await DataStore.createService(serviceData);

    return res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: newService,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin)
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, icon, features, order, active, slug } = req.body;

    const updateData = {};
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (icon) updateData.icon = icon.trim();
    if (features !== undefined) {
      updateData.features = Array.isArray(features)
        ? features
        : typeof features === 'string'
        ? features.split(',').map((f) => f.trim()).filter(Boolean)
        : [];
    }
    if (order !== undefined) updateData.order = Number(order);
    if (active !== undefined) updateData.active = Boolean(active);
    if (slug) updateData.slug = generateSlug(slug);

    const updated = await DataStore.updateService(id, updateData);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await DataStore.deleteService(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
