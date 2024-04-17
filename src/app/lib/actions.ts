'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUser } from './data';
 
const FormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  email: z.string({
    invalid_type_error: 'Please enter an email.',
  }),
  description: z.string({
    invalid_type_error: 'Please enter a description.',
  }),
  status: z.enum(['new', 'in progress', 'resolved']),
  date: z.string(),
});
 
const CreateTicket = FormSchema.omit({ id: true, userId: true, date: true });

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    description?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createTicket(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateTicket.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    description: formData.get('description'),
    status: 'new',
  });

  console.log(validatedFields);
  

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Ticket.',
    };
  }
 
  // Prepare data for insertion into the database
  const { name, email, description, status} = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  const user = await getUser(email);

  try {
    await sql`
      INSERT INTO tickets (user_id, name, email, description, status, date)
      VALUES (${user.id} ${name}, ${email}, ${description}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Ticket.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/tickets');
  redirect('/dashboard/tickets');
}

const UpdateTicket = FormSchema.omit({ id: true, userId: true, date: true });

export async function updateTicket(id: string, formData: FormData) {
  const { name, email, description, status } = UpdateTicket.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    description: formData.get('description'),
    status: formData.get('status'),
  });
  
  console.log(name, email, description, status);

  try {
    await sql`
    UPDATE tickets
    SET name = ${name}, email = ${email}, description = ${description}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Ticket.',
    };
    
  }
 
  revalidatePath('/dashboard/tickets');
  redirect('/dashboard/tickets');
}

export async function deleteTicket(id: string) {

    try {
        await sql`DELETE FROM tickets WHERE id = ${id}`;
        revalidatePath('/dashboard/tickets');
        return { message: 'Deleted Ticket.' };
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Ticket.',
        };
    }
    
}
