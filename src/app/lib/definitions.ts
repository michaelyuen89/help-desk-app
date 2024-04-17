
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
