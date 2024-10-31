"use client";
import Image from "next/image";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission process
    setTimeout(() => {
      alert("Form submitted successfully!");
      setIsSubmitting(false);
      // Clear the form fields after submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4  md:mt-16 mt-8 md:mb-12 mb-6">
      <h2 className="text-3xl font-bold text-center mb-4 p-0">
        Contact With Us
      </h2>
      <div className="grid md:grid-cols-2 gap-8 md:py-8">
        <div className="hidden md:flex justify-center items-center">
          <Image
            src="/images/img10.jpg" // Ensure the image exists at this path
            alt="Team Member 1"
            width={400}
            height={400}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            <form
              onSubmit={handleSubmit} // Adding submit handler
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  name="message"
                  placeholder="Write your message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
