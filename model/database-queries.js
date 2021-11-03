const db = require("../db-config") 

module.exports = {
    addUserkey,
    findUserkey,
    updateUserkey,
    addUser,
    findUser,
    updateUser,
    addSketch,
    addDraft,
    getDrafts,
    findDraft,
    updateDraft,
    removeDraft,
    addOrder,
    getOrders,
    addMailbox,
    getMailbox
};

async function addUserkey(userkey) {
    return await db("keys").insert(userkey, ['id'])
}

async function findUserkey(userkey) {
    return await db("keys").where({ key: userkey })
}

async function updateUserkey(userkey) {
    return await db("keys").where({ key: userkey })
    .update({ activated: true })
}

async function addUser(user) {
    return await db("registrations").insert(user, ['id'])
}

async function findUser(user) {
    return await db("registrations").where({ name: user })
}

async function updateUser(user, param) {
    return await db("registrations").where({ name: user })
    .update({ state: param })
    .then(() => {  
        return findUser(user);
    });
}

async function addSketch(sketch) {
    //return await db("sketches").insert(sketch)
    return await db("sketches").insert(sketch, ['id'])
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
        .update({ rejected: value })
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

async function addMailbox(message) {
    //return await db("contacts").insert(message)
    return await db("mailbox").insert(message, ['id'])
}

function getMailbox() {
    return db("mailbox")
}