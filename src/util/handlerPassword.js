const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async(password)=>{
    const hasehedPass = await bcrypt.hash(password,saltRounds);
    return hasehedPass
}

const checkPassword = async(password, hashPassword)=>{
    return await bcrypt.compare(password, hashPassword)
}

module.exports = {hashPassword,checkPassword};




