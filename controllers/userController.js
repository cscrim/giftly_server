import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getWishlist = async (req, res) => {

    const user_id = 1;

    try {
        const items = await knex("wishlist_items").where({ user_id }).select("*");

        if (items.length === 0) {
            console.log(`User ${user_id} has not added any items to their wishlist yet`);

            return res.status(200).json([]);
        }

        res.status(200).json(items); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "failed to get wishlist" });
    }
};


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


  const editItem = async (req, res) => {
    const { item_name, item_img, price, purchase_link, description } = req.body;
    const { item_id } = req.params;  // get item_id from use Params on the front end
  
    // validation to make sure our required fields are still provided
    if (!item_name && !item_img && !price ) {
      return res.status(400).json({ error: "At least one field must be updated." });
    }
  
    // prepare the updateFields object with the provided information 
    // allowing the user to only update one field if desired, all existing data prepopulates on the front end
    const updateFields = {};
    if (item_name) updateFields.item_name = item_name;
    if (item_img) updateFields.item_img = item_img;
    if (price) updateFields.price = price;
    if (purchase_link) updateFields.purchase_link = purchase_link;
    if (description) updateFields.description = description;
    updateFields.updated_at = knex.fn.now();  
    
    try {
      // updating the item in the db
      const [updatedItem] = await knex("wishlist_items")
        .where({ item_id })  // find the item by its id
        .update(updateFields) // update provided fields
        .returning("*");  // return the updated item
  
      if (!updatedItem) {
        return res.status(404).json({ error: "Item not found." });
      }
  
      // respond with the updated item
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update item." });
    }
  };
  

  const deleteItem = async (req, res) => {
    const { item_id } = req.params;  
  
    try {
     
      await knex("wishlist_items").where({ item_id }).del();
  
  
      res.status(200).json({ message: "Item successfully deleted." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete item." });
    }
  };


  export { getWishlist, addItem, editItem, deleteItem };