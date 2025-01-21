"use client";

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
    >
      Print Receipt
    </button>
  );
};

export default PrintButton;
