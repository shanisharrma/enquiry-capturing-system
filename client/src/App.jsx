import axios from "axios";
import { useState } from "react";

function App() {
  const defaultEnquiryData = {
    name: "",
    email: "",
    category: "Service Request",
    message: "",
  };

  const [enquiryData, setEnquiryData] = useState(defaultEnquiryData);

  const handleEnquiryFormChange = (e) => {
    const { name, value } = e.target;

    setEnquiryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEnquiryFormSubmit = (e) => {
    e.preventDefault();

    setEnquiryData(defaultEnquiryData);

    axios
      .post(`${import.meta.env.VITE_SERVER_BASE_URL}/enquiry`, enquiryData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        console.error(err);
        alert("Unable to submit the enquiry.");
      });
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <form
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleEnquiryFormSubmit}
      >
        <h2 className="text-2xl text-center text-bg-dark font-bold mb-4">
          Enquiry Form
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-title-color"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="block w-full p-2 border border-input-border rounded"
            placeholder="Please enter your name..."
            autoComplete="off"
            min={2}
            max={32}
            required
            value={enquiryData.name}
            onChange={handleEnquiryFormChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 text-title-color"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full p-2 border border-input-border rounded"
            placeholder="Please enter your email address..."
            autoComplete="off"
            required
            value={enquiryData.email}
            onChange={handleEnquiryFormChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium mb-2 text-title-color"
          >
            Category:
          </label>

          <select
            name="category"
            id="category"
            className="block w-full p-2 border text-title-color border-input-border rounded"
            required
            value={enquiryData.category}
            onChange={handleEnquiryFormChange}
          >
            <option value="Service Request">Service Request</option>
            <option value="Complaint">Complaint</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2 text-title-color"
          >
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            className="block w-full p-2 border border-input-border rounded"
            placeholder="Please enter your message..."
            rows={4}
            autoComplete="off"
            min={3}
            max={200}
            required
            value={enquiryData.message}
            onChange={handleEnquiryFormChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-bg-dark text-white py-2 rounded-md hover:bg-bg-dark-hover transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
