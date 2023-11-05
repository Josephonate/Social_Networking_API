const router = require('express').Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

module.exports = router