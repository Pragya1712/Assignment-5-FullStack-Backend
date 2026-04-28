import { Router } from "express";
import { checkAuth } from "../../shared/middlewares/auth.middleware.js";
import { paginationMiddleware } from "../../shared/middlewares/pagination.middleware.js";
import { responseProcessor } from "../../shared/responseProcessor.js";
import { validateUser, userPostValidationChains, userPutValidationChain, userPatchValidationChain } from "../../chains/validationChains/user.validation.js";
import { checkValidUserId } from "../../shared/middlewares/user.middleware.js";
import { getUsersController, getUserByIdController, createUserController, updateUserController, patchUserController, deleteUserController } from "../../controllers/user/user.controller.js";
import { User } from "../../shared/models/user.model.js";

const router = Router();

router.get("/", checkAuth, paginationMiddleware(User), responseProcessor(getUsersController));
router.get("/:id", checkAuth, checkValidUserId, responseProcessor(getUserByIdController));
router.post("/", checkAuth, validateUser(userPostValidationChains), responseProcessor(createUserController));
router.put("/:id", checkAuth, checkValidUserId, validateUser(userPutValidationChain), responseProcessor(updateUserController));

router.patch("/:id", checkAuth, checkValidUserId, validateUser(userPatchValidationChain), responseProcessor(patchUserController)
);
router.delete("/:id", checkAuth, checkValidUserId, responseProcessor(deleteUserController));

export { router as userRouter };