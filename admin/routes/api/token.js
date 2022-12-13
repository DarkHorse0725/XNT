const express = require("express");
const router = express.Router();

const TokenController = require("../../controllers/TokenController");

router.post("/getRecentData", TokenController.getRecentData);
router.post("/insertData", TokenController.insertData);
router.post("/getDashboardData", TokenController.getDashboardData);
router.post("/insertNewMember", TokenController.insertNewMember);
router.post("/deleteMember", TokenController.deleteMember);
router.post("/getMemberList", TokenController.getMemberList);

module.exports = router;