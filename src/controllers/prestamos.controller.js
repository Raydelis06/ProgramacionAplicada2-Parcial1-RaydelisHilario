import { prisma } from "../db.js"

// Crear préstamo
export const crearPrestamo = async (req, res, next) => {
	try {
		const libro = await prisma.libro.findUnique({
			where: { id: libroId }
		})

		if (!libro) {
			return res.status(404).json({
				error: "El libro no existe"
			})
		}

		if (!libro.disponible) {
			return res.status(400).json({
				error: "El libro no está disponible"
			})
		}

		const creado = await prisma.prestamo.create({
			data: {
				usuarioId: req.usuario.id,
				libroId
			},
			include: {
				libro: true
			}
		})

		await prisma.libro.update({
			where: { id: libroId },
			data: {
				disponible: false
			}
		})

		res.status(201).json(creado)
	} catch (error) {
		next(error)
	}
}

// Devolver préstamo
export const devolverPrestamo = async (req, res, next) => {
	try {
		const prestamoId = parseInt(req.params.id)

		if (!prestamoId) {
			return res.status(400).json({
				error: "El id debe ser un número válido"
			})
		}

		const prestamo = await prisma.prestamo.findUnique({
			where: { id: prestamoId }
		})

		if (!prestamo) {
			return res.status(404).json({
				error: "El préstamo no existe"
			})
		}

		if (prestamo.usuarioId !== req.usuario.id) {
			return res.status(403).json({
				error: "No tiene acceso a este préstamo"
			})
		}

		if (prestamo.fechaFin) {
			return res.status(400).json({
				error: "El préstamo ya fue devuelto"
			})
		}

		const actualizado = await prisma.prestamo.update({
			where: { id: prestamoId },
			data: {
				fechaFin: new Date()
			},
			include: {
				libro: true
			}
		})

		await prisma.libro.update({
			where: { id: prestamo.libroId },
			data: {
				disponible: true
			}
		})

		res.status(200).json(actualizado)

	} catch (error) {
		next(error)
	}
}

// Obtener todos los préstamos
export const obtenerPrestamos = async (req, res, next) => {
	try {
		const prestamos = await prisma.prestamo.findMany({
			include: {
				usuario: true,
				libro: true
			},
			orderBy: {
				id: "asc"
			}
		})

		res.status(200).json(prestamos)
	} catch (error) {
		next(error)
	}
}

// Obtener los préstamos del usuario 
export const obtenerMisPrestamos = async (req, res, next) => {
	try {
		const prestamos = await prisma.prestamo.findMany({
			where: {
				usuarioId: req.usuario.id
			},
			include: {
				libro: true
			},
			orderBy: {
				id: "asc"
			}
		})

		res.status(200).json(prestamos)
	} catch (error) {
		next(error)
	}
}
