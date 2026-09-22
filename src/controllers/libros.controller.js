import { prisma } from "@prisma/client/extension"
//crear libro
export const agregarLibro = async (req,res,next) => {
    try{
        const {nombre, autor, disponible} = req.body

        const existe = await prisma.libro.findUnique({where: {nombre, autor}})

        if(existe){
            return res.status(400).json('Ya existe un libro del mismo autor con este nombre')
        }

        const libro = await prisma.libro.create({
            data: {
                nombre, autor, disponible: disponible || true
            }
        })

        return res.status(201).json({mensaje: 'Libro agregado con exito!', libro: {
            id: libro.id,
            nombre: libro.nombre,
            disponible: libro.disponible
        }})

    }catch(err){
        console.log(err)
        next(err)
    }
}

//obtener libros agregados
export const obtenerLibros = async (req, res) => {
    try {
        const libros = await prisma.libro.findMany({
            include: { prestamos: true },
            orderBy: { id: "asc" }
        });

        res.status(200).json(libros);
    } catch (error) {
        console.error("Error al obtener los libros: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

//eliminar un libro
export const eliminarLibro = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ error: "El id debe ser un número válido" });
        }
        const libroExistente = await prisma.libro.findUnique({where: {id}})

        if(!libroExistente){
            return res.status(400).json('El libro seleccionado no existe')
        }
        
        await prisma.libro.delete({ where: { id } })

        res.status(200).json({mensaje: "Libro eliminado exitosamente"});
    } catch (error) {
        console.error("Error al eliminar el habito ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};