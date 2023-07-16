const fs = require("fs").promises;
const path = require("path");
// nanoid має бути версії 3.3.6
const { nanoid } = require("nanoid");

const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const parsedUsers = JSON.parse(await fs.readFile(filePath));
    return parsedUsers;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getContactById = async (contactId) => {
  try {
    const parsedUsers = JSON.parse(await fs.readFile(filePath));
    const contact = parsedUsers.filter((item) => item.id === contactId);
    return contact;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const removeContact = async (contactId) => {
  try {
    const parsedUsers = JSON.parse(await fs.readFile(filePath));
    const contact = parsedUsers.filter((item) => item.id === contactId);

    if (contact.length === 0) {
      return { status: 404, obj: { message: "Not found" } };
    }

    const newContacts = parsedUsers.filter((item) => item.id !== contactId);
    await fs.writeFile(filePath, JSON.stringify(newContacts));
    return { status: 200, obj: { message: "contact deleted" } };
  } catch (err) {
    console.log(err);
    return err;
  }
};

const addContact = async (body) => {
  try {
    if (!body.name) {
      return { status: 400, obj: { message: "missing required name field" } };
    }
    if (!body.email) {
      return { status: 400, obj: { message: "missing required email field" } };
    }
    if (!body.phone) {
      return { status: 400, obj: { message: "missing required phone field" } };
    }

    const id = nanoid(21);
    const newUser = { id, ...body };

    const parsedUsers = JSON.parse(await fs.readFile(filePath));
    parsedUsers.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(parsedUsers));

    return { status: 201, obj: newUser };
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateContact = async (contactId, body) => {
  try {
    if (!body.name) {
      return { status: 400, obj: { message: "missing required name field" } };
    }
    if (!body.email) {
      return { status: 400, obj: { message: "missing required email field" } };
    }
    if (!body.phone) {
      return { status: 400, obj: { message: "missing required phone field" } };
    }

    const parsedUsers = JSON.parse(await fs.readFile(filePath));
    const contact = parsedUsers.filter((item) => item.id === contactId);

    if (contact.length === 0) {
      return { status: 404, obj: { message: "Not found" } };
    }

    const newContact = { ...contact[0], ...body };

    const updatedContacts = parsedUsers.map((item) => {
      return item.id !== newContact.id ? item : newContact;
    });

    await fs.writeFile(filePath, JSON.stringify(updatedContacts));

    return { status: 200, obj: newContact };
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
