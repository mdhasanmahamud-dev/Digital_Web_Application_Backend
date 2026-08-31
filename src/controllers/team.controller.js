const Team = require("../models/team.model");

// CREATE MEMBER
const createMember = async (req, res) => {
  try {
    const { name, role, skills, experience, avatar } = req.body;

    // basic validation
    if (!name || !role || !skills || !experience) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const newMember = new Team({
      name,
      role,
      skills,
      experience,
      avatar,
    });

    const savedMember = await newMember.save();

    res.status(201).json({
      success: true,
      message: "Team member created successfully",
      data: savedMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET ALL MEMBERS
const getAllMembers = async (req, res) => {
  try {
    const members = await Team.find().sort({ experience: -1 });

    res.status(200).json({
      success: true,
      message: "All team members fetched successfully",
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// UPDATE MEMBER
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, skills, experience, avatar } = req.body;

    const updatedMember = await Team.findByIdAndUpdate(
      id,
      { name, role, skills, experience, avatar },
      { new: true, runValidators: true },
    );

    if (!updatedMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      data: updatedMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete member

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await Team.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { createMember, getAllMembers, updateMember, deleteMember };
