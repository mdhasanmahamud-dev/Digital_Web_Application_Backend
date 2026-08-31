const Contact = require("../models/contact.model");
const {
  deleteContactFromDB,
  getAllContactsFromDB,
} = require("../services/contact.service");

//Create contect
const createContact = async (req, res) => {
  try {
    const contactData = req.body;

    const contact = await Contact.create(contactData);

    // Response
    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// GET ALL CONTACTS
const getAllContacts = async (req, res) => {
  try {
    const contacts = await getAllContactsFromDB();

    // Response
    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//Delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await deleteContactFromDB(id);

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: deletedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete contact",
    });
  }
};

//Update is read stutus
const markContactAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Contact Statistics
const getContactStatistics = async (req, res) => {
  try {
    const totalContact = await Contact.countDocuments();

    const totalUnread = await Contact.countDocuments({
      isRead: false,
    });

    res.status(200).json({
      success: true,
      message: "Contact statistics fetched successfully",
      data: {
        totalContact,
        totalUnread,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
  markContactAsRead,
  getContactStatistics,
};
