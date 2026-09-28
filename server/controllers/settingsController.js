import { DataStore } from '../utils/dataStore.js';

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    const settings = await DataStore.getSettings();
    return res.status(200).json({
      success: true,
      message: 'Settings fetched successfully',
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    const {
      name,
      title,
      description,
      about,
      email,
      phone,
      location,
      socialLinks,
      seoTitle,
      seoDescription,
    } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (about !== undefined) updateData.about = about.trim();
    if (email !== undefined) updateData.email = email.trim();
    if (phone !== undefined) updateData.phone = phone.trim();
    if (location !== undefined) updateData.location = location.trim();
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks;
    if (seoTitle !== undefined) updateData.seoTitle = seoTitle.trim();
    if (seoDescription !== undefined) updateData.seoDescription = seoDescription.trim();

    const updated = await DataStore.updateSettings(updateData);

    return res.status(200).json({
      success: true,
      message: 'Site settings updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
