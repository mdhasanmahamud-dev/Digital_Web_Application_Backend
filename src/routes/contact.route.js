const express = require("express");
const {
  createContact,
  getAllContacts,
  deleteContact,
  markContactAsRead,
  getContactStatistics,
} = require("../controllers/contact.controller");
const checkAuthentication = require("../middleware/auth");
const checkRole = require("../middleware/role");

const contactRouter = express.Router();

// CREATE
contactRouter.post("/createContact", createContact);

// GET ALL
contactRouter.get(
  "/allContact",
  checkAuthentication,
  checkRole("moderator"),
  getAllContacts,
);

// Update is read
contactRouter.patch(
  "/contact/:id/read",
  checkAuthentication,
  checkRole("moderator"),
  markContactAsRead,
);

// DELETE
contactRouter.delete(
  "/contact/:id",
  checkAuthentication,
  checkRole("admin"),
  deleteContact,
);

//Count Read and Unread contact
contactRouter.get(
  "/contact-statistics",
  getContactStatistics,
);

module.exports = contactRouter;
