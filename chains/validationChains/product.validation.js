import { body, matchedData, validationResult } from "express-validator";
const productPostValidationChains = [
    body("name")
        .notEmpty().withMessage("Product name cannot be empty!")
        .isString().withMessage("Product name must be a string!")
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Product name must be between 2 and 100 characters!"),

    body("price")
        .notEmpty().withMessage("Price is required!")
        .isNumeric().withMessage("Price must be a valid number!")
        .custom((value) => {
            if (value <= 0) throw new Error("Price must be greater than zero!");
            return true;
        })
];

const productPutValidationChains = [
    body("name")
        .notEmpty().withMessage("Product name cannot be empty!")
        .isString().withMessage("Product name must be a string!")
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Product name must be between 2 and 100 characters!"),

    body("price")
        .notEmpty().withMessage("Price cannot be empty!")
        .isNumeric().withMessage("Price must be a valid number!")
        .custom((value) => {
            if (value <= 0) throw new Error("Price must be greater than zero!");
            return true;
        })
];

const productPatchValidationChains = [
    body("name")
        .optional()
        .notEmpty().withMessage("Product name cannot be empty!")
        .isString().withMessage("Product name must be a string!")
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Product name must be between 2 and 100 characters!"),

    body("price")
        .optional()
        .notEmpty().withMessage("Price cannot be empty!")
        .isNumeric().withMessage("Price must be a valid number!")
        .custom((value) => {
            if (value <= 0) throw new Error("Price must be greater than zero!");
            return true;
        })
];


const validateProductValidationChains = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty())
        return res.status(400).send({ error: result.array() });
    req.data = matchedData(req);
    next();
}

const validateProduct = (validationChains) => {
    return [...validationChains, validateProductValidationChains]
}
export { productPostValidationChains, productPutValidationChains, productPatchValidationChains, validateProduct };