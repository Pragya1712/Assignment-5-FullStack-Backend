import { Product } from "../../shared/models/product.model.js";
import { SuccessResponse } from "../../shared/responseProcessor.js";
import { BadRequestError, PageNotFoundError } from "../../shared/errorHandler.js";
import { StatusCodes } from "http-status-codes";

const getProductsController = async (req, res) => {
    return new SuccessResponse(req.result, StatusCodes.OK, "Products fetched successfully");
};

const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    if (!findProduct) throw new BadRequestError("Product not found!");
    return new SuccessResponse(findProduct, StatusCodes.OK, "Product fetched successfully");
};
const createProductController = async (req, res) => {
    const { name, price } = req.body;
    const newProduct = await Product.create({ name, price });
    return new SuccessResponse(newProduct, StatusCodes.CREATED, "Product created successfully!");
};

const updateProductController = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedProduct) throw new PageNotFoundError("Product not found!");
    return new SuccessResponse(updatedProduct, StatusCodes.OK, "Product updated successfully!");
};

const patchProductController = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );
    if (!updatedProduct) throw new BadRequestError("Product not found!");
    return new SuccessResponse(updatedProduct, StatusCodes.OK, "Product updated successfully");
};

const deleteProductController = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) throw new PageNotFoundError("Product not found!");
    return new SuccessResponse(null, StatusCodes.OK, "Product deleted successfully!");
};

export { getProductsController, getProductByIdController, createProductController, updateProductController, patchProductController, deleteProductController };