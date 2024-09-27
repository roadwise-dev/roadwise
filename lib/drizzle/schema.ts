import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").notNull().primaryKey(), // UUID, primary key
  firstName: text("first_name").notNull(), // First name column
  lastName: text("last_name").notNull(), // Last name column
  avatarUrl: text("avatar_url").notNull(), // Avatar URL column
});
