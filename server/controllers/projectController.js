import { DataStore } from '../utils/dataStore.js';

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const projects = await DataStore.getProjects();
    return res.status(200).json({
      success: true,
      message: 'Projects fetched successfully',
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project by slug
// @route   GET /api/projects/:slug
// @access  Public
export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await DataStore.getProjectBySlug(slug);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with slug '${slug}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project retrieved successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res, next) => {
  try {
    const { title, description, category, image, url, technologies, featured, order } = req.body;

    if (!title || !description || !category || !url) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, category, and url',
      });
    }

    const slug = req.body.slug ? generateSlug(req.body.slug) : generateSlug(title);

    // Check slug collision
    const existing = await DataStore.getProjectBySlug(slug);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Project with slug '${slug}' already exists. Please choose a different title or slug.`,
      });
    }

    const projectData = {
      title: title.trim(),
      slug,
      description: description.trim(),
      category: category.trim(),
      image: image || '',
      url: url.trim(),
      technologies: Array.isArray(technologies)
        ? technologies
        : typeof technologies === 'string'
        ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      featured: Boolean(featured),
      order: Number(order) || 0,
    };

    const newProject = await DataStore.createProject(projectData);

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category, image, url, technologies, featured, order, slug } = req.body;

    const updateData = {};
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (category) updateData.category = category.trim();
    if (image !== undefined) updateData.image = image;
    if (url) updateData.url = url.trim();
    if (technologies !== undefined) {
      updateData.technologies = Array.isArray(technologies)
        ? technologies
        : typeof technologies === 'string'
        ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [];
    }
    if (featured !== undefined) updateData.featured = Boolean(featured);
    if (order !== undefined) updateData.order = Number(order);
    if (slug) updateData.slug = generateSlug(slug);

    const updated = await DataStore.updateProject(id, updateData);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await DataStore.deleteProject(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
