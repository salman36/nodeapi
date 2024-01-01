import productModle from "../Models/Product.js";
import ErrorHandler from "../utils/ErrorHandler.js";

///////////// get product function ////////////////////
export const getAllProducts = async (req, res, next) => {
  try {
    const search = req.query.search || "";;
    // console.log(search);
    // const productName = productModle.find({ name: { $regex: search } });
    // console.log(productName);
    const totalCount = await productModle.countDocuments();
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // console.log(startIndex + "|" + endIndex);
    const products = await productModle
      .find({ name: { $regex: search } })
      .skip(startIndex)
      .limit(endIndex);
    // console.log(products);
    products.forEach((productPath) => {
      productPath.path = `${req.protocol}://${req.hostname}:${process.env.PORT}/${productPath.path}`;
    });
    const totalPage = Math.ceil(totalCount / limit);

    res
      .status(200)
      .json({ message: "success", products, totalPage, totalCount });
  } catch (error) {
    res.status(500).json({ message: "error" + error });
  }
};

///////////// create product function ////////////////////

export const createProduct = async (req, res, next) => {
  try {
    // console.log(req.body.product_quantity);
    // console.log(req.file.path);
    const path = req.file.path;
    const imgpath = { ...req.body, path };
    // res.send("file uploaded");
    const product = await productModle.create(imgpath);
    res.status(201).json({ message: "success", product });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

///////////// update product function ////////////////////

export const updateProduct = async (req, res, next) => {
  const product = await productModle.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const UpDatetedProduct = await productModle.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.status(201).json({ message: "success", UpDatetedProduct });
};

///////////// delete product function ////////////////////

export const deleteProduct = async (req, res, next) => {
  const product = await productModle.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();
  res.status(201).json({ message: "success", product });
};

///////////// get single product function ////////////////////

export const getSingleProduct = async (req, res, next) => {
  const product = await productModle.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(201).json({ message: "success", product });
};
