import { prisma } from '../../../prisma/prisma.js';
import { check, validationResult } from "express-validator";

const createAppointment = async (req, res) => {
    const {name, curp, infoContact, birthDate, doctorName, specialty, reason, calendar} = req.body;

    await check("name", "El nombre no puede ir vacio").notEmpty().run(req);
    await check("infoContact", "Por favor ingrese la informacion de contacto").notEmpty().run(req);
    await check("curp", "Por favor Agregue la curp").notEmpty().run(req);
    await check("birthDate", "Por favor ingrese la fecha de nacimiento del paciente").notEmpty().run(req);
    await check("doctorName", "Por favor ingrese el nombre del doctor").notEmpty().run(req);
    await check("specialty", "Por favor ingrese la especialidad del doctor").notEmpty().run(req);
    await check("reason", "Ingrese el motivo de la consulta").notEmpty().run(req);
    await check("calendar", "Seleccione la fecha de la cita").notEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                name,
                curp,
                infoContact,
                birthDate: new Date(birthDate),
                doctorName,
                specialty,
                reason,
                calendar: new Date(calendar)
            }
        });

        if (!newAppointment) {
            return res.status(400).json({message: 'No se pudo crear la cita'});
        }

        res.status(201).json({message: 'Cita creada exitosamente', appointment: newAppointment});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export {
    createAppointment
}