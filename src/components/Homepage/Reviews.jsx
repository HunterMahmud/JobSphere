import React from 'react';

const Reviews = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">What Our Users Say</h2>
        <p className="text-center text-gray-600 mt-2 mb-8">Feedback from job seekers and companies that use Job Sphere</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Review Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img className="w-12 h-12 rounded-full" src="/path-to-user-photo.jpg" alt="User Profile" />
              <div>
                <h4 className="text-xl font-bold text-gray-900">John Doe</h4>
                <p className="text-gray-600 text-sm">Software Engineer</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              {/* Star Rating */}
              <span className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor">...</svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor">...</svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor">...</svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor">...</svg>
                <svg className="w-5 h-5 text-gray-300" fill="currentColor">...</svg>
              </span>
              <p className="ml-2 text-gray-600 text-sm">4/5</p>
            </div>
            <p className="text-gray-700 mb-4">
              "Job Sphere has completely changed the way I search for jobs. I found my current position within a week!"
            </p>
            <span className="text-gray-500 text-sm">Posted on Oct 10, 2024</span>
          </div>

          {/* Add more review cards here */}
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">Submit Your Review</button>
        </div>
      </div>
    </section>

  );
};

export default Reviews;