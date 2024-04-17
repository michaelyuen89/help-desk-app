"use client";

// import { useFormState } from "react-dom";
import { TicketForm, User, UserField } from "@/app/lib/definitions";
import Link from "next/link";
import { CheckIcon, ClockIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
// import { updateTicket } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { formatDateToLocal } from "@/app/lib/utils";

export default function Form({
  ticket,
  users,
}: {
  ticket: TicketForm;
  users: UserField[];
}) {
  // const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(updateTicket, initialState);

  // TODO: Fix backend API using React Server Actions
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleResponseChange = (e: any) => {
    setResponse(e.target.value);
  };

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  console.log(ticket);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //TODO: send to backend
    alert(`Ticket updated!
    name: ${name}, email: ${email}, response: ${response}, status: ${status}`);
    router.push("/dashboard/tickets");
  };
  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    // <form action={dispatch}>
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-2 w-full rounded-md bg-white p-4">
          <div className="font-medium text-sm">Name: {ticket.name}</div>
          <div className="text-sm">Date: {formatDateToLocal(ticket.date)}</div>
          <div className="mb-2 block text-sm ">
            Description: {ticket.description}
          </div>
        </div>
      </div>
      <div className="rounded-md bg-gray-50 p-2 md:p-6">
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            Name:
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
            Email:
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
              Response:
              <textarea
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="response"
                name="response"
                onChange={handleResponseChange}
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

          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Change the ticket status:
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="new"
                    name="status"
                    type="radio"
                    value="new"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    onChange={handleStatusChange}
                  />
                  <label
                    htmlFor="new"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    New <PlusIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="in-progress"
                    name="status"
                    type="radio"
                    value="in progress"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    onChange={handleStatusChange}
                  />
                  <label
                    htmlFor="in progress"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    In Progress <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="resolved"
                    name="status"
                    type="radio"
                    value="resolved"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    onChange={handleStatusChange}
                  />
                  <label
                    htmlFor="resolved"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Resolved <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.status &&
                state.errors.status.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/tickets"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" onClick={handleSubmit}>
            Update Ticket
          </Button>
        </div>
      </div>
    </form>
  );
}
