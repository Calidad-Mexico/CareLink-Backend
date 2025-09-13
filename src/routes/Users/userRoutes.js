import express from 'express';
import {
    createUserPatient,
    createUserDoctor,
    loginUser
} from "../../controllers/Users/usersController.js";
const router = express.Router();

router.post('/login', loginUser);
router.post("/registerPatient", createUserPatient)
router.post("/registerDoctor", createUserDoctor)

export default router;