import { sql } from '@vercel/postgres';
import {
  UserField,
//   CustomersTableType,
  TicketForm,
  TicketsTable,
//   LatestInvoiceRaw,
  User,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredTickets(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();

  try {
    const tickets = await sql<TicketsTable>`
      SELECT *
      FROM tickets
      WHERE
        tickets.name ILIKE ${`%${query}%`} OR
        tickets.email ILIKE ${`%${query}%`} OR
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
// export async function fetchFilteredTickets(
//   query: string,
//   currentPage: number,
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
//   noStore();

//   try {
//     const tickets = await sql<TicketsTable>`
//       SELECT
//         tickets.id,
//         tickets.description,
//         tickets.date,
//         tickets.status,
//         users.name,
//         users.email,
//       FROM tickets
//       JOIN users ON tickets.user_id = users.id
//       WHERE
//         users.name ILIKE ${`%${query}%`} OR
//         users.email ILIKE ${`%${query}%`} OR
//         tickets.description::text ILIKE ${`%${query}%`} OR
//         tickets.date::text ILIKE ${`%${query}%`} OR
//         tickets.status ILIKE ${`%${query}%`}
//       ORDER BY tickets.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return tickets.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch tickets.');
//   }
// }

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

export async function fetchUsers() {
  noStore();
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}


export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE users.email = ${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
