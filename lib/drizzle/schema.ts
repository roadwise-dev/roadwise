import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// User table
export const user = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(), // UUID, primary key
  firstName: text("first_name").notNull(), // First name column
  lastName: text("last_name").notNull(), // Last name column
  avatarUrl: text("avatar_url").notNull(), // Avatar URL column
});

// Team table
export const team = pgTable("team", {
  id: uuid("id").defaultRandom().primaryKey(), // Team's unique ID
  name: text("name").notNull(), // Team name
  description: text("description"), // Team description
  avatarUrl: text("avatar_url"), // Avatar URL of the team (optional)
  creatorId: uuid("creator_id")
    .references(() => user.id)
    .notNull(), // Reference to the user who created the team
  createdAt: timestamp("created_at").defaultNow().notNull(), // Creation timestamp
});

// App table
export const app = pgTable("app", {
  id: uuid("id").defaultRandom().primaryKey(), // App's unique ID
  userId: uuid("user_id")
    .references(() => user.id)
    .notNull(), // Reference to the user
  name: text("name").notNull(), // Name of the app
  description: text("description"), // Description of the app
  domain: text("domain").notNull(), // Domain of the app
  avatarUrl: text("avatar_url").notNull(), // Avatar URL of the app
  slug: text("slug").notNull(), // URL-friendly slug
  createdAt: timestamp("created_at").defaultNow().notNull(), // Creation timestamp
});

// Board table
export const board = pgTable("board", {
  id: uuid("id").defaultRandom().primaryKey(), // Board's unique ID
  appId: uuid("app_id")
    .references(() => app.id)
    .notNull(), // Reference to the app
  name: text("name").notNull(), // Board name (e.g., Implementing, Won't Have)
  column: integer("column"), // Column number - 0 indexed
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
  tags: text("tags").array().notNull().default([]),
  name: text("name").notNull(), // Authors Name
  upvotes: integer("upvotes").default(0).notNull(), // Number of upvotes
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), // Creation timestamp
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

// News table
export const news = pgTable("news", {
  id: uuid("id").defaultRandom().primaryKey(), // Unique ID for the upvote
  appId: uuid("app_id")
    .references(() => app.id)
    .notNull(), // Reference to the app
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  tags: text("tags").array().notNull().default([]),
  date: timestamp("date", { withTimezone: true }).defaultNow().notNull(), // News timestamp
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), // Creation timestamp
});

export const comment = pgTable("comment", {
  id: uuid("id").defaultRandom().primaryKey(), // Unique ID for the comment
  featureId: uuid("feature_id")
    .references(() => feature.id)
    .notNull(), // Reference to the feature being commented on
  name: text("name").notNull(), // Name of the commenter
  email: text("email").notNull(), // Email of the commenter
  content: text("content").notNull(), // Content of the comment
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), // When the comment was created
});
