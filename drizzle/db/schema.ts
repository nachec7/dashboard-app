import {
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
  integer,
  date,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: text("name").notNull(),
  birthday: date("birthday").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  phone_number: text("phone_number").notNull(),
  image_url: text("image_url"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  last_access: timestamp("last_access"),
});
export type userInsert = typeof usersTable.$inferInsert;

export const customersTable = pgTable("customers", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image_url: varchar("image_url", { length: 255 }).notNull(),
});
export type customerInsert = typeof customersTable.$inferInsert;

export const invoicesTable = pgTable("invoices", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  customer_id: uuid("customer_id").notNull(),
  amount: integer("amount").notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  date: date("date").notNull(),
});
export type invoiceInsert = typeof invoicesTable.$inferInsert;

export const revenueTable = pgTable("revenue", {
  month: varchar("month", { length: 4 }).primaryKey(),
  revenue: integer("revenue").notNull(),
});
export type revenueInsert = typeof revenueTable.$inferInsert;