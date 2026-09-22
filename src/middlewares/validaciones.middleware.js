export const validarCamposRegistro = async (req,res,next) => {
    if (!req.body.nombre || !req.body.email || !req.body.password) {
        return res.status(400).json({
            error: "Los campos nombre, email y password son requeridos"
        });
    }
    next();
}

export const validarCamposLogin = async (req,res,next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            error: "Los campos email y password son requeridos"
        });
    }
    next();
}

export const validarCamposLibros = async (req,res,next) => {
    if (!req.body.nombre || !req.body.autor) {
        return res.status(400).json({
            error: "Los campos nombre y autor son requeridos"
        });
    }
    next();
}