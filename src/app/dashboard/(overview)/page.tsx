import Form from "@/app/ui/tickets/create-form";
import Breadcrumbs from "@/app/ui/tickets/breadcrumbs";
import { fetchUsers } from "@/app/lib/data";
// import { users } from "@/app/lib/dummydata";

export default async function Page() {
  const users = await fetchUsers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tickets", href: "/dashboard/tickets" },
          {
            label: "Create Ticket",
            href: "/dashboard/tickets/create",
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}
