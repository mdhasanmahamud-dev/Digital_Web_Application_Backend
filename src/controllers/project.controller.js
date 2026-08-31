const Project = require("../models/project.model");

const createProject = async (req, res) => {
  try {
    const projectData = req.body;

    // Create Project
    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// GET ALL PROJECTS
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve projects",
      error: error.message,
    });
  }
};

// GET ALL PROJECTS COUNTS
const countAllProject = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    res.status(200).json({
      success: true,
      totalProjects: projectCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to count projects",
      error: error.message,
    });
  }
};

// GET FEATURED PROJECT
const getFeaturedProject = async (req, res) => {
  try {
    const project = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve project",
      error: error.message,
    });
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

// TOGGLE FEATURED PROJECT
const makeFeaturedProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Find Project
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Toggle Featured
    project.featured = !project.featured;

    await project.save();

    res.status(200).json({
      success: true,
      message: project.featured
        ? "Project marked as featured"
        : "Project removed from featured",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update featured project",
      error: error.message,
    });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getFeaturedProject,
  updateProject,
  deleteProject,
  countAllProject,
  makeFeaturedProject,
};
