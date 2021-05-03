// Database modeling
const db = require("../dbConfig") // Which database being used

module.exports = {
    addSketch,
    addSketchToDrafts,
    getSketches,
    findSketch,
    updateSketch,
    getDrafts,
    findDraft,
    removeDraft,
    addDraftToOrders,
    getOrders
};

async function addSketch(sketch) {
    return await db("sketches").insert(sketch, ['id'])
}

async function addSketchToDrafts(sketch) {
    return await db("drafts").insert(sketch, ['id'])
}

function getSketches() {
    return db("sketches")
}

function updateSketch(id, changes) {
    return db("sketches")
        .where({ id })
        .update(changes)
        .then(() => {  // Returns the object with id
            return findSketch(id);
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