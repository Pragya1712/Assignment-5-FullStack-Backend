import { Router } from "express";
import { responseProcessor } from "../../shared/responseProcessor.js";
import { signupController, loginController } from "../../controllers/auth/auth.controller.js";
import { validateUser, userPostValidationChains, userPostCredGetMeChain } from "../../chains/validationChains/user.validation.js";

const router = Router();


router.post("/signup", validateUser(userPostValidationChains), responseProcessor(signupController));
router.post("/login", validateUser(userPostCredGetMeChain), responseProcessor(loginController));

export { router as authRouter };