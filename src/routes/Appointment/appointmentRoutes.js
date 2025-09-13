import express from 'express';
import {
    createAppointment,
    getAppointments
} from "../../controllers/Appointment/appoinmentController.js";
const router = express.Router();

router.post("/createAppointment", createAppointment)
router.get("/getAppointment", getAppointments)

export default router;