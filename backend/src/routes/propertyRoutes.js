import express from "express";
import * as propertyController from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getProperty);
router.post("/", propertyController.createProperty);
router.put("/:id", propertyController.updateProperty);
router.delete("/:id", propertyController.deleteProperty);

export default router;
