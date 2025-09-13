import express from 'express';
import cors from 'cors';
import userRoutes from "../routes/Users/userRoutes.js";

// Configuracion del servidor
const app = express();
app.set("port", process.env.PORT || 3000);


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use("/users", userRoutes)

app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
})