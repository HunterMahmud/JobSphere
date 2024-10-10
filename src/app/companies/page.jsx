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
                "softwareEngineer": "80,000 - 120,000 USD",
                "productManager": "90,000 - 130,000 USD",
                "uxDesigner": "70,000 - 110,000 USD"
            }
        },
        {
            "logo": "https://i.ibb.co.com/PjDHrcQ/Health.jpg",
            "name": "HealthCare Solutions Ltd.",
            "address": "5678 Medical Park, Houston, TX, USA",
            "companyType": "Healthcare",
            "typesOfJobs": ["Nurse", "Medical Administrator", "Lab Technician"],
            "salaryScales": {
                "Nurse": "60,000 - 90,000 USD",
                "medicalAdministrator": "70,000 - 100,000 USD",
                "labTechnician": "50,000 - 80,000 USD"
            }
        },
        {
            "logo": "https://i.ibb.co.com/j9KXbRY/Eco.jpg",
            "name": "Eco Energy Corp.",
            "address": "9012 Green Way, Denver, CO, USA",
            "companyType": "Energy",
            "typesOfJobs": ["Energy Analyst", "Project Manager", "Sustainability Consultant"],
            "salaryScales": {
                "energyAnalyst": "85,000 - 110,000 USD",
                "projectManager": "95,000 - 130,000 USD",
                "sustainabilityConsultant": "75,000 - 105,000 USD"
            }
        },
        {
            "logo": "https://i.ibb.co.com/tMWGhNR/Global.jpg",
            "name": "Global FinTech Services",
            "address": "3141 Wall Street, New York, NY, USA",
            "companyType": "Finance",
            "typesOfJobs": ["Financial Analyst", "Risk Manager", "Accountant"],
            "salaryScales": {
                "financialAnalyst": "70,000 - 100,000 USD",
                "riskManager": "85,000 - 120,000 USD",
                "Accountant": "65,000 - 95,000 USD"
            }
        },
        {
            "logo": "https://i.ibb.co.com/kcVFqtL/Edu.jpg",
            "name": "EduVation",
            "address": "1111 University Ave, Boston, MA, USA",
            "companyType": "Education",
            "typesOfJobs": ["Teacher", "Curriculum Developer", "Administrator"],
            "salaryScales": {
                "Teacher": "50,000 - 80,000 USD",
                "curriculumDeveloper": "60,000 - 90,000 USD",
                "Administrator": "70,000 - 100,000 USD"
            }
        },
        {
            "logo": "https://i.ibb.co.com/sw1g1Lg/Urban.jpg",
            "name": "Urban Construction Group",
            "address": "2222 Builders Blvd, Chicago, IL, USA",
            "companyType": "Construction",
            "typesOfJobs": ["Civil Engineer", "Construction Manager", "Site Supervisor"],
            "salaryScales": {
                "civilEngineer": "75,000 - 110,000 USD",
                "constructionManager": "90,000 - 140,000 USD",
                "siteSupervisor": "65,000 - 95,000 USD"
            }
        },
        {
            "logo": "https://i.ibb.co.com/sQ3ytKT/Retail.jpg",
            "name": "Retail Masters LLC",
            "address": "9090 Commerce Plaza, Dallas, TX, USA",
            "companyType": "Retail",
            "typesOfJobs": ["Store Manager", "Sales Associate", "Marketing Specialist"],
            "salaryScales": {
                "storeManager": "60,000 - 90,000 USD",
                "salesAssociate": "30,000 - 50,000 USD",
                "marketingSpecialist": "55,000 - 80,000 USD"
            }
        },
        {
            "logo": "https://i.ibb.co.com/n8kp7hv/DIgital.jpg",
            "name": "Digital Creatives Studio",
            "address": "7777 Art District, Los Angeles, CA, USA",
            "companyType": "Media & Advertising",
            "typesOfJobs": ["Graphic Designer", "Content Creator", "Marketing Manager"],
            "salaryScales": {
                "graphicDesigner": "55,000 - 85,000 USD",
                "contentCreator": "50,000 - 75,000 USD",
                "marketingManager": "80,000 - 120,000 USD"
            }
        }
    ];


    return (
        <div className="mx-auto my-12 px-2 md:px-10">
            <h1 className="text-3xl font-bold text-center mb-8 underline">Companies</h1>

            {/* Companies Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-around md:gap-10">
                {Array.isArray(companies) && companies.length > 0 ? (
                    companies.map((company, index) => <CompanyCard key={index} company={company} />)
                ) : (
                    <p className='text-xl text-center'>No Companies Found</p>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex flex-col md:flex-row  text-center gap-6 mx-auto max-w-[500px]">
                <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
                    Previous
                </button>
                <div className="space-x-2 flex mx-auto">
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