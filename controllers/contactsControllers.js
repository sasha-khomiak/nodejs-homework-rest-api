const Contacts = require("../models/contactsModel");
const cathAsync = require("../utils/catchAsync");

// GET ALL CONTACTS
exports.listContacts = cathAsync(async (req, res) => {
  const contacts = await Contacts.find().select("-__v");
  res.status(200).json(contacts);
});

// GET CONTACT BY ID
exports.getContactById = cathAsync(async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  res.status(200).json(contact);
});

// REMOVE CONTACT BY ID
exports.removeContact = cathAsync(async (req, res) => {
  const { contactId } = req.params;
  await Contacts.findByIdAndDelete(contactId);
  res.status(200).json({ message: "contact deleted" });
});

// ADD NEW CONTACT BY BODY JSON
exports.addContact = cathAsync(async (req, res) => {
  const newContact = await Contacts.create(req.body);
  newContact.__v = undefined;
  res.status(201).json(newContact);
});

// UPDATE CONTACT BY ID AND BODY JSON
exports.updateContact = cathAsync(async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);

  Object.keys(req.body).forEach((key) => {
    contact[key] = req.body[key];
  });

  const updatedContact = await contact.save();
  updatedContact.__v = undefined;
  res.status(200).json(updatedContact);
});

// UPDATE FAVORITE STATUS BY ID AND BODY JSON WITH FAVORITE
exports.updateFavoriteStatus = cathAsync(async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  contact.favorite = req.body.favorite;

  const updatedContact = await contact.save();

  updatedContact.__v = undefined;
  res.status(200).json(updatedContact);
});