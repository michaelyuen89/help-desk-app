import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  TicketForm,
  TicketsTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  noStore();
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTickets(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();

  try {
    const tickets = await sql<TicketsTable>`
      SELECT
        tickets.id,
        tickets.description,
        tickets.date,
        tickets.status,
        users.name,
        users.email,
      FROM tickets
      JOIN users ON tickets.user_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        tickets.description::text ILIKE ${`%${query}%`} OR
        tickets.date::text ILIKE ${`%${query}%`} OR
        tickets.status ILIKE ${`%${query}%`}
      ORDER BY tickets.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tickets.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tickets.');
  }
}

export async function fetchTicketsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tickets
    JOIN users ON tickets.user_id = users.id
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`} OR
      tickets.description::text ILIKE ${`%${query}%`} OR
      tickets.date::text ILIKE ${`%${query}%`} OR
      tickets.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tickets.');
  }
}


export async function fetchTicketById(id: string) {
  noStore();
  try {
    const data = await sql<TicketForm>`
      SELECT
        tickets.id,
        tickets.user_id,
        tickets.description,
        tickets.status
      FROM tickets
      WHERE tickets.id = ${id};
    `;

    const ticket = data.rows.map((ticket) => ({
      ...ticket
    }));

    return ticket[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ticket.');
  }
}

// export async function fetchUsers() {
//   noStore();
//   try {
//     const data = await sql<CustomerField>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `;

//     const customers = data.rows;
//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   noStore();
//   try {
//     const data = await sql<CustomersTableType>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.rows.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }

// export async function getUser(email: string) {
//   noStore();
//   try {
//     const user = await sql`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0] as User;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }
