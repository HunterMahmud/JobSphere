"use client";

import CompanyCard from "@/components/Companies/CompanyCard";
import React from "react";
import { useState, useEffect } from "react";
import  axios  from "axios";
import { toast } from 'react-hot-toast';

const page = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
        setLoading(true);
        try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/companies/api`
        );
       
        setCompanies(data.company);
      } catch (error) {
        toast.error("Error getting company data");
      }
      finally{
        setLoading(false);
      }
    };
    fetchCompanyData()
  }, []);

 console.log(companies)
 if(loading) {
    return <div>Loading...</div>
 }
  return (
    <div className="mx-auto my-12 px-2 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-8 underline">
        Companies
      </h1>

      {/* Companies Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-around md:gap-10">
        {Array.isArray(companies) && companies.length > 0 ? (
          companies.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))
        ) : (
          <p className="text-xl text-center">No Companies Found</p>
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
