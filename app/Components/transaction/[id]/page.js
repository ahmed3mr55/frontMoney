import React from "react";
import { cookies } from "next/headers";
import PrintButton from "../PrintButton";

const Page = async ({ params }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="text-center text-red-500 mt-20">
        <p>Unauthorized: No token found.</p>
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/transfer/transfermony/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    return (
      <div className="text-center text-red-500 mt-20">
        <p>Failed to fetch transaction details.</p>
      </div>
    );
  }

  const data = await res.json();
  const {
    senderUsername,
    receiverUsername,
    amount,
    date,
    description,
    status,
    _id,
  } = data;

  return (
    <div className="max-w-lg mx-auto border border-gray-300 rounded-lg overflow-hidden font-sans shadow-md mt-10 dark:bg-white">
      <div className="bg-green-500 text-white text-center p-5">
        <h1 className="text-2xl font-bold">Money Transfer Successful!</h1>
        <p className="text-lg">Transaction Description: {description}</p>
      </div>
      <div className="p-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="p-3 border font-semibold">Sender Username:</td>
              <td className="p-3 border">{senderUsername}</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Receiver Username:</td>
              <td className="p-3 border">{receiverUsername}</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Amount Transferred:</td>
              <td className="p-3 border">{amount.toLocaleString()} EGP</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Date:</td>
              <td className="p-3 border">{new Date(date).toLocaleString()}</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Transaction ID:</td>
              <td className="p-3 border">{_id}</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Status:</td>
              <td className={`p-3 border ${status === "Complete" ? "text-green-500" : "text-red-500"}`}>
                {status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-100 text-center p-4 text-sm text-gray-600">
        <PrintButton />
        <p className="mt-2">&copy; {new Date().getFullYear()} Our Platform. All rights reserved.</p>
      </div>
    </div>

  );
};

export default Page;
