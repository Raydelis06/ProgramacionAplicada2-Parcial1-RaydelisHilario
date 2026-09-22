import jwt from "jsonwebtoken"

export const verificarToken = (req, res, next) => {
  const header = req.headers["authorization"]

  if (!header) return res.status(401).json({ error: "El token es requerido" })

  const token = header.split(" ")[1]
  if (!token) return res.status(401).json({ error: "El token es requerido" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = decoded
    next()
  } catch {
    res.status(401).json({ error: "Token inválido" })
  }
}

export const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({ error: "No tiene acceso a esta funcion" })
  }
  next()
}