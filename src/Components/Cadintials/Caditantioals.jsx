import { useState } from "react";

export default function AdminInfoButton() {
  const [show, setShow] = useState(false);

  const adminEmail = "sabbirhosen@gmail.com";
  const adminPassword = "Sabbir@277";

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setShow(!show)}
        className="bg-primaryP text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primaryP/80 transition"
      >
        {show ? "Admin Info" : " Admin Info"}
      </button>

      {show && (
        <div className="mt-2 p-4  shadow-lg rounded-lg w-64 border border-gray-200">
          <p className="text-sm font-semibold">Email:</p>
          <p className="">{adminEmail}</p>

          <p className="mt-2 text-sm font-semibold">Password:</p>
          <p className="">{adminPassword}</p>
        </div>
      )}
    </div>
  );
}
