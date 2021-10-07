const db = require("../db-config") 

// Database modeling
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
    getClientsMailbox
};

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

async function updateDraft(id, comment) {
    return await db("drafts")
        .where({ id })
        .update(comment)
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