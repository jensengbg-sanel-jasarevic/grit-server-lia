const express = require("express");
const cors = require('cors')
const corsOptions ={
   origin: '*', 
   credentials: true,           
   optionSuccessStatus: 200
}

// From 'Routes' directory import code via path to the files
const loginRouter = require("../controller/login-routes")
const storageRouter = require("../controller/storage-routes")
const keygenRouter = require("../controller/keygen-routes")
const draftsRouter = require("../controller/draft-routes")
const ordersRouter = require("../controller/order-routes")
const mailboxRouter = require("../controller/mailbox-routes")

const server = express() 

// Middlewares
server.use(express.json()) 
server.use(cors(corsOptions)) 

// API Endpoints
server.get("/", (req, res) => { res.send("API") })
server.use("/api", loginRouter)
server.use("/api/keygen", keygenRouter)
server.use("/api/storage", storageRouter)
server.use("/api/drafts", draftsRouter)
server.use("/api/orders", ordersRouter)
server.use("/api/mailbox", mailboxRouter)

module.exports = server;