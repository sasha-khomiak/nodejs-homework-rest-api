const { Router } = require("express");
const router = Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

// GET ALL CONTACTS
router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// GET CONTACT BY ID
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (result.length === 0) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// ADD NEW CONTACT
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { status, obj } = await addContact(body);
    res.status(status).json(obj);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// REMOVE CONTACT BY ID
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { status, obj } = await removeContact(contactId);
    res.status(status).json(obj);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// UPDATE CONTACT BY ID
router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    if (
      body.name === undefined ||
      body.email === undefined ||
      body.phone === undefined
    ) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const { status, obj } = await updateContact(contactId, body);
    res.status(status).json(obj);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
