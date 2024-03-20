const {check, validationResult,} = require("express-validator");

const validatorCreateUser =[
        check("name")
            .exists()
            .trim()
            .notEmpty().withMessage("El campo no debe estar vació")
            .isAlpha("es-ES", {ignore:" "})
            .isLength({nim: 4 , max: 90}).withMessage("min: 4 y max: 90 caracteres"),
        check("email")
            .exists().withMessage("El email es un elemento requerido")
            .trim()
            .notEmpty().withMessage("Este campo no debe estar vacío")
            .isEmail().withMessage("Debe tener un formato de email valido")
            .normalizeEmail(),
        check("password")
            .exists().withMessage("El campo password debe existir")
            .notEmpty().withMessage("El campo no debe estar vació")
            .trim()
            .isLength({min: 8, max: 25}).withMessage("min: 8, max: 25")
            // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage("debe contener un formato correcto"),
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ ).withMessage("Debe contener un formato correcto"),
            (req, res, next)=>{
                try {
                    validationResult(req).throw()
                    return next()
                } catch (error) {
                    res.status(400).json({error: error.array()})
                    
                }
            }
]

module.exports =  validatorCreateUser;