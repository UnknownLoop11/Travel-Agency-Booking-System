"use client";

import React, { useRef } from "react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

const Invoice = ({
  customerName,
  packageName,
  pricePerPerson,
  numberOfTravelers,
  email,
  phoneNumber,
}) => {
  const invoiceRef = useRef(null);

  const totalPrice = pricePerPerson * numberOfTravelers;

  // Generate PDF function
  const generatePDF = () => {
    const input = invoiceRef.current;

    domtoimage.toPng(input).then((imgData) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width
      const imgHeight = (input.offsetHeight * imgWidth) / input.offsetWidth;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div className="w-1/2 mx-auto p-4">
      {/* Invoice Content */}
      <div
        ref={invoiceRef}
        style={{
          padding: "24px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <h1 className="text-2xl font-bold mb-4">Invoice</h1>

        {/* Customer Details */}
        <div>
          <h2 className="font-semibold">Customer Details</h2>
          <p>Name: {customerName}</p>
          <p>Email: {email}</p>
          <p>Phone: {phoneNumber}</p>
        </div>

        {/* Package Details */}
        <div className="mt-4">
          <h2 className="font-semibold">Package Details</h2>
          <p>Package: {packageName}</p>
          <p>Price per person: ${pricePerPerson}</p>
          <p>Number of Travelers: {numberOfTravelers}</p>
          <p className="font-bold mt-2">Total Price: ${totalPrice}</p>
        </div>
      </div>

      {/* Generate PDF Button */}
      <button
        onClick={generatePDF}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default Invoice;
