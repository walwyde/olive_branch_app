const express = require("express")
const router = express.Router()

const {check} = require("express-validator")
const controller = require("../../controllers/profile")
const auth = require("../../middleware/index")

router.get("/me", auth.auth, controller.loadCurrentProfile)
router.post("/me", auth.auth, [], controller.createProfile)

module.exports = router