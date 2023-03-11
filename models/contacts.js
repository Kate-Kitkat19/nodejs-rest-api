const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return error.message;
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const neededContact = data.find((contact) => contact.id === contactId);
    return neededContact || null;
  } catch (error) {
    return error.message;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    return error.message;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
  } catch (error) {
    return error.message;
  }
}

async function updateContactById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
};
