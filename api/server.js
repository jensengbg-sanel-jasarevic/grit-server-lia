const express = require("express");
const helmet = require('helmet');
const cors = require('cors')

// Import Javascript code modules from 'controller' directory via path to the files
const loginRouter = require("../controller/login-routes")
const storageRouter = require("../controller/storage-routes")
const keygenRouter = require("../controller/keygen-routes")
const draftsRouter = require("../controller/draft-routes")
const ordersRouter = require("../controller/order-routes")
const mailboxRouter = require("../controller/mailbox-routes")

const server = express() 

// Middlewares
server.use(helmet()) // Security middleware (runs every time API called).  
server.use(express.json()) 
server.use(cors())

// API Endpoints
server.get("/", (req, res) => { res.send("API") })
server.use("/api", loginRouter)
server.use("/api/keygen", keygenRouter)
server.use("/api/storage", storageRouter)
server.use("/api/drafts", draftsRouter)
server.use("/api/orders", ordersRouter)
server.use("/api/mailbox", mailboxRouter)

module.exports = server;