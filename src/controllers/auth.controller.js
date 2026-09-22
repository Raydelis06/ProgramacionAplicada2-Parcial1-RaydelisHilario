import { prisma } from "@prisma/client/extension"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//registro
export const registro = async (req,res,next) => {
    try{
        const {nombre, email, password, rol } = req.body

        const existe = await prisma.usuario.findUnique({where: {email}})

        if(existe){
            return res.status(400).json('Ya existe un usuario con este email')
        }

        const hash = await bcrypt.hash(password, 10)
        const usuario = await prisma.usuario.create({
            data: {
                nombre, email, password: hash, rol: rol || "usuario"
            }
        })

        return res.status(201).json({mensaje: 'Usuario registrado con exito!', usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.rol
        }})

    }catch(err){
        console.log(err)
        next(err)
    }
}
//login
export const login = async (req,res,next) => {
    try{
        const {email, password} = req.body

        const usuario = await prisma.usuario.findUnique({where: {email}})

        if(!usuario){
            return res.status(400).json('Credenciales invalidas')
        }
        const valido = await bcrypt.compare(password, usuario.password)
        if (!valido) return res.status(401).json({ error: "Credenciales inválidas" })
    
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.json({ token })
        
    }catch(err){
        console.log(err)
        next(err)
    }
}