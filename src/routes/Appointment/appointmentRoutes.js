import express from 'express';
import {
    createAppointment
} from "../../controllers/Appointment/appoinmentController.js";
const router = express.Router();

router.post("/createAppointment", createAppointment)

export default router;