import React, { useState } from 'react';
import StarRating from './StarRating';
import Link from 'next/link';
import Image from 'next/image';


const AddReview = ({ rating }) => {

    const [formData, setFormData] = useState({
        name: '',
        position: '',
        companyName: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(name);
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
                name: '',
                position: '',
                companyName: '',
                message: ''
            });
        }, 1000);
    };


    return (
        <div className='md:mx-4 mx-2'>
            <h1 className="text-3xl font-bold text-center mb-2 underline underline-offset-2">Post a Review</h1>
            <div className="flex flex-col justify-around md:flex-row md:px-10 md:py-4  shadow-md rounded-lg gap-10">

                <div className='md:w-1/2 mx-2'>
                    <div className="flex flex-col items-center justify-center border border-accent shadow-md rounded-xl md:p-4 ">
                        <h1 className="text-4xl font-bold my-2">Review Us</h1>
                        <p className="text-lg text-center text-gray-600 mb-4">We had love to hear from you! Please fill out the form below.</p>
                        <form
                            onSubmit={handleSubmit}  // Adding submit handler
                            className="bg-white shadow-md rounded-lg px-8 pt-2 pb-4 mb-4 max-w-lg w-full"
                        >
                            <div className="mb-4">
                                <div className='flex flex-col items-center mx-auto my-2'>
                                    <h1 className='text-lg text-center font-semibold my-2'>How much you like our website?</h1>
                                    <StarRating />
                                </div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                                    Position
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="position"
                                    type="position"
                                    name="position"
                                    placeholder="Enter your position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company name">
                                    Company Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="companyName"
                                    type="companyName"
                                    name="companyName"
                                    placeholder="Enter your company name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                    Review Message
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="message"
                                    name="message"
                                    placeholder="Write your review message"
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
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='rounded-lg flex flex-col justify-center mx-auto items-center'>
                    <div className='rounded-lg'>
                        <Image
                            src="/images/Review.png"
                            alt="Team Member 1"
                            width={600}
                            height={400}
                            className="mb-4 shadow-lg rounded-lg"
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default AddReview;