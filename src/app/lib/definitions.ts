// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Ticket = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  description: string;
  status: 'new' | 'in progress' | 'resolved';
  date: string;
};

export type TicketsTable = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  description: string;
  date: string;
  status: 'new' | 'in progress' | 'resolved';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type UserField = {
  id: string;
  name: string;
};

export type TicketForm = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  description: string;
  status: 'new' | 'in progress' | 'resolved';
};
