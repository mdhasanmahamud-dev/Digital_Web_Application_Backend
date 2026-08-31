// services/contact.service.js

const Contact = require("../models/contact.model");

// GET ALL CONTACTS FROM DB
const getAllContactsFromDB = async () => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  // Check Contacts
  if (!contacts || contacts.length === 0) {
    throw new Error("No contacts found");
  }

  return contacts;
};

// DELETE CONTACT FROM DB
const deleteContactFromDB = async (id) => {
  const deletedContact = await Contact.findByIdAndDelete(id);

  // Check Contact
  if (!deletedContact) {
    throw new Error("Contact not found");
  }

  return deletedContact;
};

module.exports = {
  getAllContactsFromDB,
  deleteContactFromDB,
};
