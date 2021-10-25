const db = require("../db-config") 

module.exports = {
    addSketch,
    getSketches,
    findSketch,
    addDraft,
    getDrafts,
    findDraft,
    updateDraft,
    removeDraft,
    addOrder,
    getOrders,
    addContactsMailbox,
    getContactsMailbox,
    addClientsMailbox,
    getClientsMailbox,
    addUserKey,
    findUserKey,
    updateUserKey,
    addUser,
    findUser
};

async function addUserKey(userKey) {
    return await db("keys").insert(userKey, ['id'])
}

 function findUserKey(userKey) {
    return db("keys").where({ key: userKey })
}

function updateUserKey(userKey) {
    return db("keys").where({ key: userKey })
    .update({activated: true})
}

async function addUser(user) {
    return await db("registrations").insert(user, ['id'])
}

function findUser(user) {
    return db("registrations").where({ name: user })
}

async function addSketch(sketch) {
    //return await db("sketches").insert(sketch)
    return await db("sketches").insert(sketch, ['id'])
}

function getSketches() {
    return db("sketches")
}

function findSketch(id) {
    return db("sketches").where({ id: id }).first()
}

async function addDraft(sketch) {
    //return await db("drafts").insert(sketch)
     return await db("drafts").insert(sketch, ['id'])
 }

function getDrafts() {
    return db("drafts")
}

function findDraft(id) {
    return db("drafts").where({ id: id }).first()
}

async function updateDraft(id, value) {
    return await db("drafts")
        .where({ id })
        .update({rejected: value})
        .then(() => {  // Returns the object with id
            return findDraft(id);
        });
}

function removeDraft(id) {
    return db("drafts").where({ id }).del()
}

async function addOrder(draft) {
    //return await db("orders").insert(draft)
    return await db("orders").insert(draft, ['id'])
}

function getOrders() {
    return db("orders")
}

async function addContactsMailbox(message) {
    //return await db("contacts").insert(message)
    return await db("contacts").insert(message, ['id'])
}

function getContactsMailbox() {
    return db("contacts")
}

async function addClientsMailbox(message) {
    return await db("clients").insert(message, ['id'])
}

function getClientsMailbox() {
    return db("clients")
}