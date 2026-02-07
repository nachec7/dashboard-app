import {
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
  integer,
  date,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "user", "guest"]);
export const invoiceStarusEnum = pgEnum('invoice_status', ["pending", "paid"]);

export const usersTable = pgTable("users", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),
  name: text("name").notNull(),
  birthday: date("birthday").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  phone_number: text("phone_number").notNull(),
  role: userRoleEnum().default("user").notNull(),
  image_url: text("image_url"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  last_access: timestamp("last_access"),
});
export type userInsert = typeof usersTable.$inferInsert;

export const customersTable = pgTable("customers", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image_url: varchar("image_url", { length: 255 }).notNull(),
});
export type customerInsert = typeof customersTable.$inferInsert;

export const invoicesTable = pgTable("invoices", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),
  customer_id: uuid("customer_id").notNull(),
  amount: integer("amount").notNull(),
  status: invoiceStarusEnum().default("pending").notNull(),
  date: date("date").notNull(),
});
export type invoiceInsert = typeof invoicesTable.$inferInsert;

export const revenueTable = pgTable("revenue", {
  month: varchar("month", { length: 4 }).primaryKey(),
  revenue: integer("revenue").notNull(),
});
export type revenueInsert = typeof revenueTable.$inferInsert;
