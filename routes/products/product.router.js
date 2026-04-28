import { Router } from "express";
import { checkAuth, isAdmin } from "../../shared/middlewares/auth.middleware.js";
import { responseProcessor } from "../../shared/responseProcessor.js";
import { paginationMiddleware } from "../../shared/middlewares/pagination.middleware.js";
import { checkValidProductId } from "../../shared/middlewares/product.middleware.js";
import { validateProduct, productPostValidationChains, productPutValidationChains, productPatchValidationChains } from "../../chains/validationChains/product.validation.js";
import { getProductsController, getProductByIdController, createProductController, updateProductController, patchProductController, deleteProductController } from "../../controllers/product/product.controller.js";
import { Product } from "../../shared/models/product.model.js";

const router = Router();

router.get("/", checkAuth, paginationMiddleware(Product), responseProcessor(getProductsController));
router.get("/:id", checkAuth, checkValidProductId, responseProcessor(getProductByIdController));
router.post("/", checkAuth, isAdmin(), validateProduct(productPostValidationChains), responseProcessor(createProductController));
router.put("/:id", checkAuth, isAdmin(), checkValidProductId, validateProduct(productPutValidationChains), responseProcessor(updateProductController));
router.patch("/:id", checkAuth, isAdmin(), checkValidProductId, validateProduct(productPatchValidationChains), responseProcessor(patchProductController));
router.delete("/:id", checkAuth, isAdmin(), checkValidProductId, responseProcessor(deleteProductController));

export { router as productRouter };