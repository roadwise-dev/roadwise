import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// User table
export const user = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(), // UUID, primary key
  firstName: text("first_name").notNull(), // First name column
  lastName: text("last_name").notNull(), // Last name column
  avatarUrl: text("avatar_url").notNull(), // Avatar URL column
});

// App table
export const app = pgTable("app", {
  id: uuid("id").defaultRandom().primaryKey(), // App's unique ID
  userId: uuid("user_id")
    .references(() => user.id)
    .notNull(), // Reference to the user
  name: text("name").notNull(), // Name of the app
  slug: text("slug").notNull(), // URL-friendly slug
  description: text("description"), // Description of the app
  createdAt: timestamp("created_at").defaultNow().notNull(), // Creation timestamp
});

// Board table
export const board = pgTable("board", {
  id: uuid("id").defaultRandom().primaryKey(), // Board's unique ID
  appId: uuid("app_id")
    .references(() => app.id)
    .notNull(), // Reference to the app
  name: text("name").notNull(), // Board name (e.g., Implementing, Won't Have)
  createdAt: timestamp("created_at").defaultNow().notNull(), // Creation timestamp
});

// Feature table
export const feature = pgTable("feature", {
  id: uuid("id").defaultRandom().primaryKey(), // Feature's unique ID
  boardId: uuid("board_id")
    .references(() => board.id)
    .notNull(), // Reference to the board
  title: text("title").notNull(), // Title of the feature
  description: text("description").notNull(), // Detailed description
  upvotes: integer("upvotes").default(0).notNull(), // Number of upvotes
  implemented: text("implemented").default("false").notNull(), // Feature implemented status
  createdAt: timestamp("created_at").defaultNow().notNull(), // Creation timestamp
});

// Upvote table
export const upvote = pgTable("upvote", {
  id: uuid("id").defaultRandom().primaryKey(), // Unique ID for the upvote
  email: text("email").notNull(), // Email of the user who upvoted
  featureId: uuid("feature_id")
    .references(() => feature.id)
    .notNull(), // Reference to the feature
  createdAt: timestamp("created_at").defaultNow().notNull(), // Creation timestamp
});
