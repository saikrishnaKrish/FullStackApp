const bcrypt = require('bcrypt');
const password = "sai@123";


const hashPassword = async()=>{
    console.time("bcrypt");
    // const salt = await bcrypt.genSalt(10); 
    const salt = '$2b$10$CwiLiauiH4TYAEdKBrplwO'
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log("password", hashedPassword);
    const isMatching = await bcrypt.compare(password, hashedPassword);
    console.log("isMatching", isMatching);
    console.timeEnd("bcrypt");
    console.log("********************")
}

hashPassword()