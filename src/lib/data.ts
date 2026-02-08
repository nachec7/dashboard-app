// src/lib/data.ts

import { db } from '~/db';
import { formatCurrency } from './utils';
import { server$ } from '@builder.io/qwik-city';
import { revenueTable, invoicesTable, customersTable } from '~/db/schema';
import { sql, count, desc, eq } from 'drizzle-orm';

export const fetchRevenue = server$(async function () {
  try {
    const rows = await db.select().from(revenueTable);
    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data: ' + (error as Error).message);
  }
});

export const fetchLatestInvoices = server$(async function () {
  try {
    const data = await db
      .select({
        id: invoicesTable.id,
        amount: invoicesTable.amount,
        name: customersTable.name,
        image_url: customersTable.image_url,
        email: customersTable.email,
      })
      .from(invoicesTable)
      .innerJoin(customersTable, eq(invoicesTable.customer_id, customersTable.id))
      .orderBy(desc(invoicesTable.date))
      .limit(5);

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
});

export const fetchCardData = server$(async function () {
  try {
    const invoiceCountPromise = db.select({ count: count() }).from(invoicesTable);
    const customerCountPromise = db.select({ count: count() }).from(customersTable);
    const invoiceStatusPromise = db
      .select({
        paid: sql`SUM(CASE WHEN ${invoicesTable.status} = 'paid' THEN ${invoicesTable.amount} ELSE 0 END)`.mapWith(
          Number,
        ),
        pending: sql`SUM(CASE WHEN ${invoicesTable.status} = 'pending' THEN ${invoicesTable.amount} ELSE 0 END)`.mapWith(
          Number,
        ),
      })
      .from(invoicesTable);

    const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(invoiceCount[0].count ?? '0');
    const numberOfCustomers = Number(customerCount[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(invoiceStatus[0].paid ?? 0);
    const totalPendingInvoices = formatCurrency(invoiceStatus[0].pending ?? 0);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
});
