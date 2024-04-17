import Form from "@/app/ui/tickets/edit-form";
import Breadcrumbs from "@/app/ui/tickets/breadcrumbs";
import { fetchTicketById, fetchUsers } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [ticket, users] = await Promise.all([
    fetchTicketById(id),
    fetchUsers(),
  ]);

  if (!ticket) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tickets", href: "/dashboard/tickets" },
          {
            label: "Edit Ticket",
            href: `/dashboard/tickets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form ticket={ticket} users={users} />
    </main>
  );
}
