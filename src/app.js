import "dotenv/config"
import express from "express"
import { loggerMiddleware } from "./middlewares/logger.middleware.js"
import authRoutes from "./routes/auth.routes.js"

const app = express()

app.use(express.json())
app.use(loggerMiddleware)

//Ruta publica para autenticacion (login y registro)
app.use("/auth", authRoutes)

//ruta con proteccion de rol para libros

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500).json({ error: "Error interno del servidor" })
})

export default app
