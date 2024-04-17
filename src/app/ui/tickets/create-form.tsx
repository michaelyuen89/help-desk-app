"use client";

// import { useFormState } from "react-dom";
import { UserField } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
// import { createTicket } from "@/app/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form({ users }: { users: UserField[] }) {
  const initialState = { message: null, errors: {} };
  //   const [state, dispatch] = useFormState(createTicket, initialState);

  // TODO: Fix backend API using React Server Actions
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //TODO: send to backend
    alert(`Ticket created!
    name: ${name}, email: ${email}, description: ${description}`);
    router.push("/dashboard/tickets");
  };

  return (
    // <form action={dispatch}>
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            Name:{" "}
            <input
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              name="name"
              type="text"
              onChange={handleNameChange}
            />
          </label>
          <div id="user-error" aria-live="polite" aria-atomic="true">
            {/* {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email:{" "}
            <input
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              name="email"
              type="text"
              onChange={handleEmailChange}
            />
          </label>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {/* {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description:{" "}
              <textarea
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="description"
                name="description"
                onChange={handleDescriptionChange}
              />
            </label>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/tickets"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            onClick={handleSubmit}
            id="{/*change to onSubmit*/"
          >
            Create Ticket
          </Button>
        </div>
      </div>
    </form>
  );
}
