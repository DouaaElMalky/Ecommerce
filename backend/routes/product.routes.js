const express=require("express");
const router=express.Router();
const prodController = require("../controllers/product.controller");
const loginMiddleware = require("../middlewares/login.middlewares")
const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "D:/S5/dev.web avance/TP/tp5/ecommerce/backend/uploads");
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage:storage});

router.get("/", loginMiddleware.verifyToken, prodController.getAllProducts);
router.get("/:id", loginMiddleware.verifyToken, prodController. getProductById);
router.post("/", loginMiddleware.verifyToken, upload.single("productImage"), prodController.addProduct);
router.delete("/:id", loginMiddleware.verifyToken, prodController.deleteProduct);
router.patch("/:id", loginMiddleware.verifyToken, prodController.updateProduct);

module.exports = router;