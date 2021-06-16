const express = require("express");
const shortid = require('shortid');
const cors = require('cors')

const dbQueries = require("../models/database-queries")

const sketchesRouter = require("../Routes/sketch-routes")
const draftsRouter = require("../Routes/draft-routes")
const ordersRouter = require("../Routes/order-routes")
const mailboxRouter = require("../Routes/mailbox-routes")
const awsRouter = require("../Routes/aws-routes")

const server = express() 
server.use(express.json()) 
server.use(cors())

server.get("/", (req, res) => {
    res.json( { message: "Home"} )
});

// POST record to sketches & drafts table
server.post("/", async (req, res) => {
    const sketchID = shortid.generate()
    dbQueries.addSketch({ message: `Sketch record (${sketchID}) added for sketch table` })
    dbQueries.addSketchToDrafts({ message: `Sketch (${sketchID}) record added to draft table` })
     .then(lessons => { 
         res.status(200).json(lessons) })
     .catch(error => { 
         res.status(500).json({ message: "Unable to perform operation" }) });
 })

server.use("/api/sketches", sketchesRouter)
server.use("/api/drafts", draftsRouter)
server.use("/api/orders", ordersRouter)
server.use("/api/mailbox", mailboxRouter)
server.use("/api/aws", awsRouter)

module.exports = server;