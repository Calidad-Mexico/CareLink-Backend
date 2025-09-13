import express from 'express';
import {
    createUserPatient,
    createUserDoctor
} from "../../controllers/Users/usersController.js";
const router = express.Router();

router.post("/registerPatient", createUserPatient)
router.post("/registerDoctor", createUserDoctor)

export default router;