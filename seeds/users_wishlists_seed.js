/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex("users").del();
  await knex("wishlist_items").del();

  const [user_id] = await knex("users").insert(
    {
      username: "courtney",
      email: "courtney@giftly.com",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    "user_id" 
  );

  await knex("wishlist_items").insert({
    user_id: user_id, 
    item_name: "Super Puff Jacket",
    item_img:
      "https://assets.aritzia.com/image/upload/large/f24_a05_112871_1274_off_a.jpg",
    price: 275.0,
    purchase_link:
      "https://www.aritzia.com/en/product/the-super-puff™-shorty/112871.html?dwvar_112871_color=1274",
    description:
      "Satin flex shorty super puff jacket - with 700+ down fill rated to -20 degrees C",
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  });
}
