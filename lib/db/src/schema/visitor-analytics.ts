import {
  date,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const visitorSessions = pgTable(
  "visitor_sessions",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    sessionHash: text("session_hash").notNull(),
    pagePath: text("page_path").notNull(),
    visitedOn: date("visited_on", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("visitor_sessions_daily_page_unique").on(
      table.sessionHash,
      table.pagePath,
      table.visitedOn,
    ),
    index("visitor_sessions_visited_on_idx").on(table.visitedOn),
  ],
);