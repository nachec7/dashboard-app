import { db } from "~/db";
import {
  newInvoices,
  newCustomers,
  newRevenue,
  newUsers,
} from "~/lib/placeholder-data";
import {
  customersTable,
  invoicesTable,
  revenueTable,
  usersTable,
} from "~/db/schema";

import { hash } from "bcrypt";

async function seedUsers() {
  try {
    for (const user of newUsers) {
      const hashed = await hash(user.password, 10);
      user.password = hashed;
    }

    await db.insert(usersTable).values(newUsers);
    console.log(`Seeded ${newUsers.length} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedInvoices(db) {
  try {
    await db.insert(invoicesTable).values(newInvoices);
    console.log(`Seeded ${newInvoices.length} invoices`);
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedCustomers(db) {
  try {
    await db.insert(customersTable).values(newCustomers);
    console.log(`Seeded ${newCustomers.length} customers`);
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function seedRevenue(db) {
  try {
    await db.insert(revenueTable).values(newRevenue);
    console.log(`Seeded ${newRevenue.length} revenue`);
  } catch (error) {
    console.error("Error seeding revenue:", error);
    throw error;
  }
}

async function main() {
 // await seedUsers(db);
  await seedCustomers(db);
  await seedInvoices(db);
  await seedRevenue(db);
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
