const router = require('express').Router();

const {
    getUsers,
    getuser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

module.exports = router