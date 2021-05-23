const express = require("express");
const path = require('path')
const shortid = require('shortid');

const dbQueries = require("../models/database-queries")

const sketchesRouter = require("../Routes/sketch-routes")
const draftsRouter = require("../Routes/draft-routes")
const ordersRouter = require("../Routes/order-routes")
const mailboxRouter = require("../Routes/mailbox-routes")

const server = express() 
server.use(express.json()) 
server.use(express.static(path.join(__dirname, "../dist")));
server.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../dist", "index.html"))
);

server.get("/", (req, res) => {
    res.json( { message: "Home"} )
});

// POST record to sketches & drafts table
server.post("/", async (req, res) => {
    dbQueries.addSketch({ message: `Sketch record (${shortid.generate()}) added for sketch table` })
    dbQueries.addSketchToDrafts({ message: `Draft record (${shortid.generate()}) added for draft table` })
     .then(lessons => { 
         res.status(200).json(lessons) })
     .catch(error => { 
         res.status(500).json({ message: "Unable to perform operation" }) });
 })

server.use("/api/sketches", sketchesRouter)
server.use("/api/drafts", draftsRouter)
server.use("/api/orders", ordersRouter)
server.use("/api/mailbox", mailboxRouter)

module.exports = server;