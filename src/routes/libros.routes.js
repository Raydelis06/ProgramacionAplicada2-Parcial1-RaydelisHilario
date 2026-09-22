import { Router } from "express";
import {
    obtenerLibros,
    agregarLibro,
    eliminarLibro
} from "../controllers/libros.controller"
import {
    validarCamposLibros
} from "../middlewares/validaciones.middleware"

const router = Router()

//rutas para /libros

//acceso: cualquier usuario
router.get('/', obtenerLibros)
//acceso: admin
router.post('/', validarCamposLibros, agregarLibro)
//acceso: admin
router.get('/:id', eliminarLibro)


export default router