import { Router } from "express"
import {
	crearPrestamo,
	devolverPrestamo,
	obtenerPrestamos,
	obtenerMisPrestamos
} from "../controllers/prestamos.controller.js"
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js"

const router = Router()

//rutas para /prestamos

//acceso: cualquier usuario 
router.post('/', verificarToken, crearPrestamo)
router.put('/:id/devolver', verificarToken, devolverPrestamo)
router.get('/mis-prestamos', verificarToken, obtenerMisPrestamos)

//acceso: admin
router.get('/', verificarToken, soloAdmin, obtenerPrestamos)

export default router
