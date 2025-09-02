import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// User table
export const user = sqliteTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  avatarUrl: text("avatar_url").notNull(),
});

// Team table
export const team = sqliteTable("team", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  avatarUrl: text("avatar_url"),
  creatorId: text("creator_id")
    .references(() => user.id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

// App table
export const app = sqliteTable("app", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  domain: text("domain").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  slug: text("slug").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

// Board table
export const board = sqliteTable("board", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  appId: text("app_id")
    .references(() => app.id)
    .notNull(),
  name: text("name").notNull(),
  column: integer("column"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

// Feature table
export const feature = sqliteTable("feature", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  boardId: text("board_id")
    .references(() => board.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  name: text("name").notNull(),
  upvotes: integer("upvotes").default(0).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

// Upvote table
export const upvote = sqliteTable("upvote", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  featureId: text("feature_id")
    .references(() => feature.id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

// News table
export const news = sqliteTable("news", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  appId: text("app_id")
    .references(() => app.id)
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  date: integer("date", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export const comment = sqliteTable("comment", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  featureId: text("feature_id")
    .references(() => feature.id)
    .notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export const subscribe = sqliteTable("subscribe", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  appId: text("app_id")
    .references(() => app.id)
    .notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});
