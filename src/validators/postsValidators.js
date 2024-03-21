const {check, validationResult} = require("express-validator");

const postsValidator =[
    check("title")
        .exists()
        .notEmpty()
        .trim()
        .isAlpha("es-ES",{ignore:" "})
        .isLength({min: 4 , max: 200}),
    check("body")
        .exists()
        .notEmpty()
        .trim()
        .isAlpha("es-ES",{ignore:" "})
        .isLength({min: 4 , max: 500}),
        (req, res, next)=>{
            try {
                validationResult(req).throw()
                return next()
            } catch (error) {
                res.status(400).json({error: error.array()})
            }
            
        }
];

module.exports = postsValidator