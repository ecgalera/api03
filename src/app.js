require("dotenv").config();
const path = require("path")
const express = require("express");
const server = express();
const userRoutes = require("../src/user/userRouter")
const routerPosts = require("../src/posts/postsRouter")
const morgan = require("morgan")


// Conexión a Base de Datos
require("../db/db.config")

const PORT = process.env.PORT || 3030;

// Middleware 
server.use(express.static("public"))
server.use(express.static("src/storage"))
// server.use(express.static("storage"))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(morgan("dev"))
// Router
server.use("/user", userRoutes);
server.use("/posts", routerPosts)

server.listen(PORT, (err)=>{
    err 
    ? console.log(`Error: ${err}` )
    : console.log(`Conectados en : http://localhost:${PORT} ...`)
})

// 404 Todas las peticiones con 404 entran aca (CATCH ALL ROUTE)
server.use((req, res, next)=>{
    let error = new Error("Resource not found");
    error.status = 404;
    next(error)
 });
 
 // Error handler -------------------------------------------------
 server.use((error, req,res, next)=>{
     if(!error.status){
         error.status = 500;
     }
     res.status(error.status).json({status: error.status, message: error.message})
 });

