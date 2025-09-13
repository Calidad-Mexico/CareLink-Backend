import express from 'express';
import cors from 'cors';
import userRoutes from "../routes/Users/userRoutes.js";
import appointmentRoutes from "../routes/Appointment/appointmentRoutes.js";

// Configuracion del servidor
const app = express();
app.set("port", process.env.PORT || 3000);


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Server activo
app.get("/serverAlive", (req, res) => {
    res.status(200).json({ message: `Server is alive on port ${app.get("port")}` });
})

// Rutas
app.use("/users", userRoutes)
app.use("/appointments", appointmentRoutes)

app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
})