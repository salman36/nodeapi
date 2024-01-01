import express from "express";
import multer from "multer";
import {
  authorizeRoles,
  isAuthenticateUser,
} from "../middleware/authenticate.js";

// handle storage using multer
// var upload = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + ".jpg"
//       //   // `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, DIR);
//     },
//     filename: function (req, file, cb) {
//       const fileName = file.originalname.toLowerCase().split(" ").join("-");
//       cb(null, fileName);
//       cb(null, file.filename + "-" + Date.now() + ".jpg");
//       console.log(file.originalname);
//     },
//   }),
// }).single("file");

const storagemedia = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storagemedia });

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from "../Controllers/ProductController.js";

const productRouter = express.Router();

productRouter
  .route("/products")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllProducts);
productRouter
  .route("/product/create")
  .post(upload.single("image"),isAuthenticateUser, authorizeRoles("admin"), createProduct);
productRouter
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct);

export default productRouter;
