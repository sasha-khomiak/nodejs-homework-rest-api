const { Router } = require("express");
const router = Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const catchAsync = require("../../utils/catchAsync");
// const createUserDataValidator = require("../../utils/userValidator");

// GET ALL CONTACTS
router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const result = await listContacts();
    res.status(200).json(result);
  })
);

// GET CONTACT BY ID
router.get(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (result.length === 0) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(result[0]);
  })
);

// ADD NEW CONTACT BY BODY JSON
router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const body = req.body;

    if (
      body.name === undefined &&
      body.email === undefined &&
      body.phone === undefined
    ) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const { status, obj } = await addContact(body);
    res.status(status).json(obj);
  })
);

// REMOVE CONTACT BY ID
router.delete(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    const { status, obj } = await removeContact(contactId);
    res.status(status).json(obj);
  })
);

// UPDATE CONTACT BY ID AND BODY JSON
router.put(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    const body = req.body;

    if (
      body.name === undefined &&
      body.email === undefined &&
      body.phone === undefined
    ) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const { status, obj } = await updateContact(contactId, body);
    res.status(status).json(obj);
  })
);

module.exports = router;
