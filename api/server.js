const express = require("express");
const cors = require('cors')

// Path to directories 
const homeRouter = require("../Routes/home-routes")
const sketchesRouter = require("../Routes/sketch-routes")
const draftsRouter = require("../Routes/draft-routes")
const ordersRouter = require("../Routes/order-routes")
const mailboxRouter = require("../Routes/mailbox-routes")
const awsRouter = require("../Routes/aws-routes")

const server = express() 
server.use(express.json()) 
server.use(cors())

// API Endpoints
server.use("/", homeRouter)
server.use("/api/sketches", sketchesRouter)
server.use("/api/drafts", draftsRouter)
server.use("/api/orders", ordersRouter)
server.use("/api/mailbox", mailboxRouter)
server.use("/api/aws", awsRouter)

module.exports = server;