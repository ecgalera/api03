const connections = require("../../db/db.config")

const getAllPosts = async ()=>{
    const query = "SELECT * FROM posts";
    try {
        return await connections.query(query);
        
    } catch (error) {
        return {error: error.code} 
    }
};

const addNewPosts = async (posts) =>{
    const query = "INSERT INTO posts SET ?"
    try {
        return await connections.query(query, posts)
    } catch (error) {
        return {error: error.code}
    }
};

const getPostsWith = async (string) =>{
    const query = `SELECT * FROM posts WHERE title LIKE "%${string}%"`
    try {
        return await connections.query(query)
    } catch (error) {
        return {error: error.code}
    }
}


module.exports= {
    getAllPosts,
    addNewPosts,
    getPostsWith,
}