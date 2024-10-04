"use client"

import CompanyCard from '@/components/Companies/CompanyCard';
import React from 'react';

const page = () => {

    const companies = [
        {
          "logo": "https://i.ibb.co.com/tbTQy0f/Tech.jpg",
          "name": "Tech Innovators Inc.",
          "address": "1234 Silicon Valley, San Francisco, CA, USA",
          "companyType": "Technology",
          "typesOfJobs": ["Software Engineer", "Product Manager", "UX Designer"],
          "salaryScales": {
            "Software Engineer": "80,000 - 120,000 USD",
            "Product Manager": "90,000 - 130,000 USD",
            "UX Designer": "70,000 - 110,000 USD"
          },
          "postedJobs": [
            {
              "jobTitle": "Senior Software Engineer",
              "description": "Experienced software engineer to lead product development."
            },
            {
              "jobTitle": "Junior UX Designer",
              "description": "Entry-level position for a creative UX designer."
            }
          ]
        },
        {
          "logo": "https://i.ibb.co.com/PjDHrcQ/Health.jpg",
          "name": "HealthCare Solutions Ltd.",
          "address": "5678 Medical Park, Houston, TX, USA",
          "companyType": "Healthcare",
          "typesOfJobs": ["Nurse", "Medical Administrator", "Lab Technician"],
          "salaryScales": {
            "Nurse": "60,000 - 90,000 USD",
            "Medical Administrator": "70,000 - 100,000 USD",
            "Lab Technician": "50,000 - 80,000 USD"
          },
          "postedJobs": [
            {
              "jobTitle": "Senior Nurse",
              "description": "Responsible for overseeing patient care and management."
            },
            {
              "jobTitle": "Lab Technician",
              "description": "Lab technician to perform various clinical tests."
            }
          ]
        },
        {
          "logo": "https://i.ibb.co.com/j9KXbRY/Eco.jpg",
          "name": "Eco Energy Corp.",
          "address": "9012 Green Way, Denver, CO, USA",
          "companyType": "Energy",
          "typesOfJobs": ["Energy Analyst", "Project Manager", "Sustainability Consultant"],
          "salaryScales": {
            "Energy Analyst": "85,000 - 110,000 USD",
            "Project Manager": "95,000 - 130,000 USD",
            "Sustainability Consultant": "75,000 - 105,000 USD"
          },
          "postedJobs": [
            {
              "jobTitle": "Energy Analyst",
              "description": "Analyze energy usage and recommend sustainability solutions."
            },
            {
              "jobTitle": "Project Manager",
              "description": "Lead energy-efficient building projects."
            }
          ]
        },
        {
          "logo": "https://i.ibb.co.com/tMWGhNR/Global.jpg",
          "name": "Global FinTech Services",
          "address": "3141 Wall Street, New York, NY, USA",
          "companyType": "Finance",
          "typesOfJobs": ["Financial Analyst", "Risk Manager", "Accountant"],
          "salaryScales": {
            "Financial Analyst": "70,000 - 100,000 USD",
            "Risk Manager": "85,000 - 120,000 USD",
            "Accountant": "65,000 - 95,000 USD"
          },
          "postedJobs": [
            {
              "jobTitle": "Financial Analyst",
              "description": "Analyze financial data and trends for clients."
            },
            {
              "jobTitle": "Risk Manager",
              "description": "Assess and mitigate risks in financial operations."
            }
          ]
        },
        {
          "logo": "https://i.ibb.co.com/kcVFqtL/Edu.jpg",
          "name": "EduVation",
          "address": "1111 University Ave, Boston, MA, USA",
          "companyType": "Education",
          "typesOfJobs": ["Teacher", "Curriculum Developer", "Administrator"],
          "salaryScales": {
            "Teacher": "50,000 - 80,000 USD",
            "Curriculum Developer": "60,000 - 90,000 USD",
            "Administrator": "70,000 - 100,000 USD"
          },
          "postedJobs": [
            {
              "jobTitle": "Senior Curriculum Developer",
              "description": "Develop and oversee curriculum implementation."
            },
            {
              "jobTitle": "High School Teacher",
              "description": "Teach various subjects in high school."
            }
          ]
        },
        {
          "logo": "https://i.ibb.co.com/sw1g1Lg/Urban.jpg",
          "name": "Urban Construction Group",
          "address": "2222 Builders Blvd, Chicago, IL, USA",
          "companyType": "Construction",
          "typesOfJobs": ["Civil Engineer", "Construction Manager", "Site Supervisor"],
          "salaryScales": {
            "Civil Engineer": "75,000 - 110,000 USD",
            "Construction Manager": "90,000 - 140,000 USD",
            "Site Supervisor": "65,000 - 95,000 USD"
          },
          "postedJobs": [
            {
              "jobTitle": "Construction Manager",
              "description": "Manage large-scale urban construction projects."
            },
            {
              "jobTitle": "Site Supervisor",
              "description": "Oversee site operations and worker management."
            }
          ]
        },
        {
          "logo": "https://i.ibb.co.com/sQ3ytKT/Retail.jpg",
          "name": "Retail Masters LLC",
          "address": "9090 Commerce Plaza, Dallas, TX, USA",
          "companyType": "Retail",
          "typesOfJobs": ["Store Manager", "Sales Associate", "Marketing Specialist"],
          "salaryScales": {
            "Store Manager": "60,000 - 90,000 USD",
            "Sales Associate": "30,000 - 50,000 USD",
            "Marketing Specialist": "55,000 - 80,000 USD"
          },
          "postedJobs": [
            {
              "jobTitle": "Store Manager",
              "description": "Manage day-to-day store operations."
            },
            {
              "jobTitle": "Sales Associate",
              "description": "Assist customers with product selection and purchases."
            }
          ]
        },
        {
          "logo": "https://i.ibb.co.com/n8kp7hv/DIgital.jpg",
          "name": "Digital Creatives Studio",
          "address": "7777 Art District, Los Angeles, CA, USA",
          "companyType": "Media & Advertising",
          "typesOfJobs": ["Graphic Designer", "Content Creator", "Marketing Manager"],
          "salaryScales": {
            "Graphic Designer": "55,000 - 85,000 USD",
            "Content Creator": "50,000 - 75,000 USD",
            "Marketing Manager": "80,000 - 120,000 USD"
          },
          "postedJobs": [
            {
              "jobTitle": "Graphic Designer",
              "description": "Design visual content for digital platforms."
            },
            {
              "jobTitle": "Content Creator",
              "description": "Create engaging content for clients' digital channels."
            }
          ]
        }
      ];


    return (
        <div className="container mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-8">Jobs</h1>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
        {Array.isArray(companies) && companies.length > 0 ? (
          companies.map((company, index) => <CompanyCard key={index} company={company} />)
        ) : (
          <p>No jobs found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex justify-center gap-6">
        <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
          Previous
        </button>
        <div className="space-x-2">
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            1
          </button>
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            2
          </button>
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            3
          </button>
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            ...
          </button>
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            8
          </button>
        </div>
        <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
          Next
        </button>
      </div>
    </div>
    );
};

export default page;