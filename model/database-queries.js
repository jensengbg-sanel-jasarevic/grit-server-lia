const db = require("../db-config") 

// Database modeling
module.exports = {
    addSketch,
    addDraft,
    getSketches,
    findSketch,
    updateDraft,
    getDrafts,
    findDraft,
    removeDraft,
    addDraftToOrders,
    getOrders,
    addToContactsMailbox,
    addToClientsMailbox,
    getContactsMailbox,
    getClientsMailbox
};

function getContactsMailbox() {
    return db("contacts")
}

function getClientsMailbox() {
    return db("clients")
}

async function addToContactsMailbox(message) {
    return await db("contacts").insert(message)
    //return await db("contacts").insert(message, ['id'])
}

async function addToClientsMailbox(message) {
    return await db("clients").insert(message, ['id'])
}

async function addSketch(sketch) {
    return await db("sketches").insert(sketch)
    //return await db("sketches").insert(sketch, ['id'])
}

async function addDraft(sketch) {
   return await db("drafts").insert(sketch)
    //return await db("drafts").insert(sketch, ['id'])
}

function getSketches() {
    return db("sketches")
}

async function updateDraft(id, comment) {
    return await db("drafts")
        .where({ id })
        .update(comment)
        .then(() => {  // Returns the object with id
            return findDraft(id);
        });
}

function findSketch(id) {
    return db("sketches").where({ id: id }).first()
}

function getDrafts() {
    return db("drafts")
}

function findDraft(id) {
    return db("drafts").where({ id: id }).first()
}

function removeDraft(id) {
    return db("drafts").where({ id }).del()
}

async function addDraftToOrders(draft) {
    return await db("orders").insert(draft)
   // return await db("orders").insert(draft, ['id'])
}

function getOrders() {
    return db("orders")
}