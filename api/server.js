const express = require("express");
const cors = require('cors')

// From 'Routes' directory import code via path to the files
const sketchesRouter = require("../controller/sketch-routes")
const draftsRouter = require("../controller/draft-routes")
const ordersRouter = require("../controller/order-routes")
const mailboxRouter = require("../controller/mailbox-routes")
const storageRouter = require("../controller/storage-routes")

const server = express() 

// Middlewares
server.use(express.json()) 
server.use(cors())

// API Endpoints
server.use("/api/sketches", sketchesRouter)
server.use("/api/drafts", draftsRouter)
server.use("/api/orders", ordersRouter)
server.use("/api/mailbox", mailboxRouter)
server.use("/api/storage", storageRouter)

module.exports = server;