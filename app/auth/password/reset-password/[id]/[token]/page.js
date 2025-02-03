import React from "react";

async function fetchResetPasswordData(id, token) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/password/reset-password/${id}/${token}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Invalid or expired reset link.");
  }
  const data = await response.json();
  return data;
}

const ResetPasswordPage = async ({ params }) => {
  const { id, token } = await params; // حل المشكلة باستخدام await

  try {
    const userData = await fetchResetPasswordData(id, token);

    return (
      <div className="flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 mt-20 p-6 rounded-2xl shadow-lg max-w-sm w-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">
            Reset Password for {userData.email}
          </h3>
          <form
            action={`${process.env.NEXT_PUBLIC_DOMAIN}/password/reset-password/${id}/${token}`}
            method="POST"
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="password" className="text-sm text-gray-600 dark:text-white">
                New Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Enter your new password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:text-white"
              />
              <label className="text-sm text-gray-600 dark:text-white" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your new password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            <p>Make sure your new password is secure and memorable.</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Error: {error.message}
          </h3>
        </div>
      </div>
    );
  }
};

export default ResetPasswordPage;
