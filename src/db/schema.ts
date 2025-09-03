import {
  integer,
  sqliteTable,
  text,
  unique,
  index,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// App table
export const app = sqliteTable(
  "app",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    domain: text("domain").notNull(),
    avatarUrl: text("avatar_url").notNull(),
    slug: text("slug").notNull().unique(), // Add unique constraint
    onboardingCompleted: integer("onboarding_completed", {
      mode: "boolean",
    }).default(false),
    isPublic: integer("is_public", { mode: "boolean" }).default(true),
    emailNotifications: integer("email_notifications", {
      mode: "boolean",
    }).default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (table) => ({
    // Add indexes for better performance
    slugIdx: index("app_slug_idx").on(table.slug),
    userIdIdx: index("app_user_id_idx").on(table.userId),
  }),
);

// Board table
export const board = sqliteTable(
  "board",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    appId: text("app_id")
      .references(() => app.id, { onDelete: "cascade" }) // Add cascade delete
      .notNull(),
    name: text("name").notNull(),
    column: integer("column"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (table) => ({
    appIdIdx: index("board_app_id_idx").on(table.appId),
  }),
);

// Feature table
export const feature = sqliteTable(
  "feature",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    boardId: text("board_id")
      .references(() => board.id, { onDelete: "cascade" }) // Add cascade delete
      .notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    tags: text("tags", { mode: "json" })
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'`),
    name: text("name").notNull(),
    upvotes: integer("upvotes").default(0).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (table) => ({
    boardIdIdx: index("feature_board_id_idx").on(table.boardId),
  }),
);

// Upvote table
export const upvote = sqliteTable(
  "upvote",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull(),
    featureId: text("feature_id")
      .references(() => feature.id, { onDelete: "cascade" }) // Add cascade delete
      .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (table) => ({
    // Prevent duplicate upvotes
    emailFeatureUnique: unique("upvote_email_feature_unique").on(
      table.email,
      table.featureId,
    ),
    featureIdIdx: index("upvote_feature_id_idx").on(table.featureId),
    emailIdx: index("upvote_email_idx").on(table.email),
  }),
);

// News table
export const news = sqliteTable(
  "news",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    appId: text("app_id")
      .references(() => app.id, { onDelete: "cascade" }) // Add cascade delete
      .notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    image: text("image"),
    tags: text("tags", { mode: "json" })
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'`),
    date: integer("date", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (table) => ({
    appIdIdx: index("news_app_id_idx").on(table.appId),
  }),
);

export const comment = sqliteTable(
  "comment",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    featureId: text("feature_id")
      .references(() => feature.id, { onDelete: "cascade" }) // Add cascade delete
      .notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    content: text("content").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (table) => ({
    featureIdIdx: index("comment_feature_id_idx").on(table.featureId),
  }),
);

export const subscribe = sqliteTable(
  "subscribe",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    appId: text("app_id")
      .references(() => app.id, { onDelete: "cascade" }) // Add cascade delete
      .notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
  },
  (table) => ({
    // Prevent duplicate subscriptions
    emailAppUnique: unique("subscribe_email_app_unique").on(
      table.email,
      table.appId,
    ),
    appIdIdx: index("subscribe_app_id_idx").on(table.appId),
  }),
);
