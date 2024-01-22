/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("id").primary(); // Auto-incrementing primary key
      table.string("user_name").unique().notNullable(); // Unique username, not nullable
      // Add other columns as needed
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTable("users");
  }
  