const userModel= require("../models/userModel");

const {getAllFactory,createFactory,
    getElementByIdFactory,
    updateElementByIdFactory,
    deleteElementByIdHandler,
    checkInput} =require("../utils/CRUDfacotry");

const getUserHandler = getAllFactory(userModel);
const getUserByIdHandlder = getElementByIdFactory(userModel);
const createUserHandler = createFactory(userModel);
const deleteUserByIdHandler = deleteElementByIdHandler(userModel);
const updateUserByIdHandler = updateElementByIdFactory(userModel);

module.exports={
    getUserByIdHandlder,
    getUserHandler,
    createUserHandler,
    deleteUserByIdHandler,
    updateUserByIdHandler,
    checkInput
}