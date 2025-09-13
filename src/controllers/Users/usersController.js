import bcrypt from 'bcrypt';
import { prisma } from '../../../prisma/prisma.js';
import { check, validationResult } from "express-validator";

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    await check("email", "El correo no es válido").isEmail().run(req);
    await check("password", "El password debe de ser mínimo 6 caracteres").isLength({min: 6}).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await prisma.userPacient.findUnique({
            where: {email}
        }) || await prisma.userDoctor.findUnique({
            where: {email}
        });

        if (!user) {
            return res.status(400).json({message: 'Usuario no encontrado'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({message: 'Contraseña incorrecta'});
        }

        res.status(200).json({message: 'Usuario logueado exitosamente', user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const createUserPatient = async (req, res) => {
    const { email, password, repeatPassword, curp } = req.body;

    await check("email", "El correo no es válido").isEmail().run(req);
    await check("password", "El password debe de ser mínimo 6 caracteres").isLength({ min: 6 }).run(req);
    await check("repeatPassword").equals(password).run(req);
    await check("curp", "La CURP no es válida").isLength({ min: 18, max: 18 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    try {
        const createdUser = await prisma.userPacient.create({
            data: {
                email,
                password: hashedPassword,
                role: 'PATIENT',
                curp
            }
        });

        if (!createdUser) {
            res.status(400).json({ message: 'No se pudo crear el usuario' });
        }

        res.status(201).json({ message: 'Usuario creado exitosamente', createdUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createUserDoctor = async (req, res) => {
    const { name, email, password, rfc ,repeatPassword, specialty } = req.body;

    await check("name", "El nombre es obligatorio").notEmpty().run(req);
    await check("email", "El correo no es válido").isEmail().run(req);
    await check("password", "El password debe de ser mínimo 6 caracteres").isLength({ min: 6 }).run(req);
    await check("repeatPassword", "El password debe de ser mínimo 6 caracteres").equals(password).isLength({ min: 6 }).run(req);
    await check("curp", "La CURP no es válida").isLength({ min: 18, max: 18 }).run(req);
    await check("rfc", "El RFC no es válido").notEmpty().isLength({ min: 10, max: 15 }).run(req);
    await check("specialty", "La especialidad es obligatoria").notEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    try {
        const createdUser = await prisma.userDoctor.create({
            data: {
                name,
                email,
                password: hashedPassword,
                rfc,
                specialty,
                role: 'DOCTOR',
            }
        });

        if (!createdUser) {
            res.status(400).json({ message: 'No se pudo crear el usuario' });
        }

        res.status(201).json({ message: 'Usuario creado exitosamente', createdUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    loginUser,
    createUserPatient,
    createUserDoctor
}
