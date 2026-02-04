import { unique } from "drizzle-orm/gel-core";
import { date, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    birthday: date().notNull(),
    email: text().notNull().unique(),
    phoneNumber: text().notNull(),
    photoUrl: text(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
    lastAccess: timestamp(),
});
export type userInsert = typeof usersTable.$inferInsert;
