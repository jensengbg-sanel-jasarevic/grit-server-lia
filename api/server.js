const express = require("express");
const cors = require('cors')

// From 'Routes' directory import code via path to the files
const homeRouter = require("../routes/home-routes")
const sketchesRouter = require("../routes/sketch-routes")
const draftsRouter = require("../routes/draft-routes")
const ordersRouter = require("../routes/order-routes")
const mailboxRouter = require("../routes/mailbox-routes")
const storageRouter = require("../routes/storage-routes")

const server = express() 

// Middlewares
server.use(express.json()) 
server.use(cors())

// API Endpoints
server.use("/", homeRouter)
server.use("/api/sketches", sketchesRouter)
server.use("/api/drafts", draftsRouter)
server.use("/api/orders", ordersRouter)
server.use("/api/mailbox", mailboxRouter)
server.use("/api/storage", storageRouter)

module.exports = server;