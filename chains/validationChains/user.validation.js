import { body, matchedData, validationResult } from "express-validator";

const userPostValidationChains = [
    body("userName")
        .notEmpty()
        .withMessage("userName cannot be empty !")
        .isString()
        .withMessage("userName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("userName sould be between [3, 30] !"),
    body("displayName")
        .notEmpty()
        .withMessage("displayName cannot be empty!")
        .isString()
        .withMessage("displayName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("displayName must be between [3, 30] !"),
    body("password")
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.'),
    body("role")
        .notEmpty()
        .withMessage("role cannot be empty!")
        .isIn(["user", "admin"])
        .withMessage("role must be either 'user' or 'admin'")
]

const userPutValidationChain = [
    body("userName")
        .notEmpty()
        .withMessage("userName cannot be empty !")
        .isString()
        .withMessage("userName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("userName sould be between [3, 30] !"),
    body("displayName")
        .notEmpty()
        .withMessage("displayName cannot be empty!")
        .isString()
        .withMessage("displayName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("displayName must be between [3, 30] !"),
]
const userPatchValidationChain = [
    body("userName")
        .optional()
        .notEmpty()
        .withMessage("userName cannot be empty !")
        .isString()
        .withMessage("userName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("userName sould be between [3, 30] !"),
    body("displayName")
        .optional()
        .notEmpty()
        .withMessage("displayName cannot be empty!")
        .isString()
        .withMessage("displayName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("displayName must be between [3, 30] !"),
]

const userPostCredGetMeChain = [
    body("userName")
        .notEmpty()
        .withMessage("userName cannot be empty !")
        .isString()
        .withMessage("userName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("userName sould be between [3, 30] !"),
    body("password")
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
]

const validateUserValidationChains = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty())
        return res.status(400).send({ error: result.array() });
    req.data = matchedData(req);
    next();
}

const validateUser = (validationChains) => {
    return [...validationChains, validateUserValidationChains]
}

export { validateUser, userPostValidationChains, userPutValidationChain, userPostCredGetMeChain, userPatchValidationChain }