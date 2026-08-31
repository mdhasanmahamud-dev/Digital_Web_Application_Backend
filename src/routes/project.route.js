const express = require("express");
const {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  countAllProject,
  getFeaturedProject,
  makeFeaturedProject,
} = require("../controllers/project.controller");
const checkAuthentication = require("../middleware/auth");
const checkRole = require("../middleware/role");

const projectRouter = express.Router();

// CREATE PROJECT
projectRouter.post(
  "/create-project",
  checkAuthentication,
  checkRole("admin"),
  createProject,
);
projectRouter.get(
  "/all-projects",
  checkAuthentication,
  checkRole("moderator"),
  getAllProjects,
);
projectRouter.get(
  "/all-project-count",
  checkAuthentication,
  checkRole("moderator"),
  countAllProject,
);
projectRouter.patch(
  "/update-project/:id",
  checkAuthentication,
  checkRole("admin"),
  updateProject,
);
projectRouter.patch(
  "/make-featured/:id",
  checkAuthentication,
  checkRole("admin"),
  makeFeaturedProject,
);

projectRouter.delete(
  "/delete-project/:id",
  checkAuthentication,
  checkRole("super-admin"),
  deleteProject,
);

projectRouter.get("/featured-project", getFeaturedProject);

module.exports = projectRouter;
