// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment ,sendPaymentSuccessEmail} = require("../controllers/Razorpay")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature",auth,isStudent, verifyPayment)
router.post("/sendPaymentSuccessmail",auth,isStudent,sendPaymentSuccessEmail)

module.exports = router