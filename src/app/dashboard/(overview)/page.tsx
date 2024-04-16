// import CardWrapper from "@/app/ui/dashboard/cards";
// import RevenueChart from "@/app/ui/dashboard/revenue-chart";
// import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
// import { lusitana } from "@/app/ui/fonts";
// import { Suspense } from "react";
// import {
//   RevenueChartSkeleton,
//   LatestInvoicesSkeleton,
//   CardsSkeleton,
// } from "@/app/ui/skeletons";

// export default async function Page() {
//   return (
//     <main>
//       <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         <Suspense fallback={<CardsSkeleton />}>
//           <CardWrapper />
//         </Suspense>
//       </div>
//       <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
//         {/* <Suspense fallback={<RevenueChartSkeleton />}>
//           <RevenueChart />
//         </Suspense>
//         <Suspense fallback={<LatestInvoicesSkeleton />}>
//           <LatestInvoices />
//         </Suspense> */}
//       </div>
//     </main>
//   );
// }

"use client";
import { useState } from "react";
import { Button } from "@/app/ui/button";

export default function Page() {
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
    alert(`name: ${name}, email: ${email}, description: ${description}`);
  };

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          Submit a request
        </div>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <label>
            Name:{" "}
            <input
              className="border-2 rounded-md"
              value={name}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <label>
            Email:{" "}
            <input
              className="border-2 rounded-md"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <label>
            Description:{" "}
            <textarea
              className="border-2 rounded-md"
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <br />
        <Button type="submit">Create Ticket</Button>
      </form>
    </main>
  );
}
