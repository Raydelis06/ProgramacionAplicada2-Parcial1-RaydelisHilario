import { Router } from "express";
import {
    obtenerLibros,
    agregarLibro,
    eliminarLibro
} from "../controllers/libros.controller"
import {
    validarCamposLibros
} from "../middlewares/validaciones.middleware"
import soloAdmin from "../middlewares/auth.middleware"

const router = Router()

//rutas para /libros

//acceso: cualquier usuario
router.get('/', obtenerLibros)
//acceso: admin
router.post('/', soloAdmin, validarCamposLibros, agregarLibro)
//acceso: admin
router.get('/:id', soloAdmin, eliminarLibro)


export default router