const {
  getAllPosts,
  addNewPosts,
  getPostsWith,
} = require("../posts/postsModels");

// const getAll = async(req, res, next)=>{
//   const dbResponse = await getAllPosts();
//   console.log(dbResponse)
//   if(dbResponse instanceof Error) return next(dbResponse);
//   dbResponse.length 
//   ? res.status(200).json(dbResponse)
//   :next()
// }


const allPostsWith = async (req, res, next) => {
  let dbResponse = null;
  if (req.query.title) {
      dbResponse = await getPostsWith(req.query.title);
      
  }else{
    dbResponse = await getAllPosts();
    
  }
  if(dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length 
  ? res.status(200).json(dbResponse)
  : next()
};

const addPosts = async (req, res, next)=>{
        const dbResponse = await addNewPosts({...req.body, idUsers:req.user.id});
        if(dbResponse instanceof Error) { 
            return next(dbResponse)
        }else{
            res.status(200).json({message: `Posts created by: Eduardo`})
        }
}

module.exports = {
  allPostsWith,
    addPosts,
    // getAll
};

