/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("user_id").primary();
      table.string("username", 255).notNullable().unique();
      table.string("email", 255).notNullable().unique();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })

    .createTable("wishlist_items", (table) => {
      table.increments("item_id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.string("item_name", 255).notNullable();
      table.string("item_img").notNullable();
      table.decimal("price", 10, 2).unsigned().notNullable();
      table.string("purchase_link", 255);
      table.string("description", 255);

      table
        .foreign("user_id")
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })

    .createTable("shared_lists", (table) => {
      table.increments("share_id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.integer("shared_with_id").unsigned().notNullable();
      table.integer("item_id").unsigned().notNullable();

      table
        .foreign("user_id")
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .foreign("shared_with_id")
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .foreign("item_id")
        .references("item_id")
        .inTable("wishlist_items")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.unique(["user_id", "shared_with_id", "item_id"]);

      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

export function down(knex) {
    return knex.schema
      .dropTable("shared_lists")  
      .dropTable("wishlist_items")  
      .dropTable("users"); 
  }