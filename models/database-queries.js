// Database modeling
const db = require("../dbConfig") // Which database being used

module.exports = {
    addSketch,
    addSketchToDrafts,
    getSketches,
    findSketch,
    updateDraft,
    getDrafts,
    findDraft,
    removeDraft,
    addDraftToOrders,
    getOrders,
    addToMailbox,
    getMailbox
};

function getMailbox() {
    return db("mailbox")
}

async function addToMailbox(order) {
    return await db("mailbox").insert(order, ['id'])
}

async function addSketch(sketch) {
    return await db("sketches").insert(sketch, ['id'])
}

async function addSketchToDrafts(sketch) {
    return await db("drafts").insert(sketch, ['id'])
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
    return await db("orders").insert(draft, ['id'])
}

function getOrders() {
    return db("orders")
}