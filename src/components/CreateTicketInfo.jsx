import React from "react";

const CreateTicketInfo = () => {
  return (
    <div className="mt-6 p-4 rounded-xl bg-gray-50 border">
      <h3 className="font-semibold mb-2">After Ticket Creation:</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
        <li>Your ticket will be analyzed by our agent.</li>
        <li>It will be assigned to the best-fit moderator.</li>
        <li>This process may take some time — please be patient.</li>
        <li>You can track your ticket status on the Ticket Dashboard.</li>
      </ul>
    </div>
  );
};

export default CreateTicketInfo;
