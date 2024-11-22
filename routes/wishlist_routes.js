import express from 'express';
import { getWishlist, getItemDetails, addItem, editItem, deleteItem } from '../controllers/userController.js';

const router = express.Router();

router.get("/", getWishlist);

router.post("/", addItem);

router.get("/details/:item_id", getItemDetails);

router.delete("/details/:item_id", deleteItem);

router.get("/edit/:item_id", getItemDetails);

router.put("/edit/:item_id", editItem);

export default router;