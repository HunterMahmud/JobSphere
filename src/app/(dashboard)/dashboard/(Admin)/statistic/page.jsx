"use client"; // This must be the first line in your file

import React from "react";

// Sample Fake Data
const fakeData = {
  users: {
    total: 4200,
    active: 3000,
    inactive: 1200,
    seekers: 2000,
    recruiters: 2200,
  },
  jobs: {
    posted: 1500,
    applied: 750,
    pending: 300,
  },
};

const Statistics = () => {
  const { users, jobs } = fakeData;

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">JobSphere Statistics</h2>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{users.total}</div>
          <div className="stat-desc">Total registered users</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <div className="stat-title">Active Users</div>
          <div className="stat-value">{users.active}</div>
          <div className="stat-desc">Users currently active</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
          <div className="stat-title">Total Posted Jobs</div>
          <div className="stat-value">{jobs.posted}</div>
          <div className="stat-desc">Jobs posted by users</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="stat-title">Total Applications</div>
          <div className="stat-value">{jobs.applied}</div>
          <div className="stat-desc">Jobs applied by users</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 0v4m0-4H8m4 0h4" />
            </svg>
          </div>
          <div className="stat-title">Pending Jobs</div>
          <div className="stat-value">{jobs.pending}</div>
          <div className="stat-desc">Jobs waiting for approval</div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
