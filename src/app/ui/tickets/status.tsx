import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "new",
          "bg-yellow-100 text-gray-500": status === "in progress",
          "bg-green-500 text-white": status === "resolved",
        }
      )}
    >
      {status === "new" ? (
        <>
          new
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "in progress" ? (
        <>
          In Progress
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "resolved" ? (
        <>
          Resolved
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
