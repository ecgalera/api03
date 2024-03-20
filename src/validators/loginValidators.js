const { check, validationResult } = require("express-validator");

const loginValidator = [
  check("email")
    .exists()
    .withMessage("Debe existir el campo email")
    .notEmpty()
    .withMessage("Debe ingresar un email")
    .trim()
    .isEmail()
    .withMessage("El email tiene un formato incorrecto")
    .normalizeEmail(),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("Debe ingresar un email")
    .trim()
    .isLength({ min: 8, max: 25 })
    .withMessage("min:8 , max:25")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
    .withMessage("Password Debe contener un formato correcto"),
  (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(400).json({error: error.array()})
        
    }
 }
]

module.exports = loginValidator