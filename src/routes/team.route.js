const express = require("express");
const { createMember, getAllMembers, updateMember, deleteMember } = require("../controllers/team.controller");

const teamRouter = express.Router();

teamRouter.post("/create-member", createMember);
teamRouter.get("/team", getAllMembers);
teamRouter.put("/team/:id", updateMember);
teamRouter.delete("/team/:id", deleteMember);

module.exports = teamRouter;
