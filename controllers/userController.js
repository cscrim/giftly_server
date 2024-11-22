import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const addItem = async (req, res) => {
    const { item_name, item_img, price, purchase_link, description } = req.body;
  
    // basic validation since these fields are required in the db schema 
    if (!item_name || !item_img || !price) {
      return res.status(400).json({ error: "Item name, image, and price are required" });
    }
  
    try {
      // insert the wishlist item into the db
      const [newItem] = await knex("wishlist_items").insert({
        user_id: 1, // hardcoded for now before login page is created, ideally would get dynamically through authentication
        item_name,
        item_img,
        price,
        purchase_link,
        description,
      }).returning("*");
  
      // respond with the item
      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add item to wishlist" });
    }
  };

  export { addItem };