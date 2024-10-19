"use client";

import CompanyCard from "@/components/Companies/CompanyCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";
import Loader from "../loading";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const fetchCompanyData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/companies/api`, {
          params: {
            search,
            page,
            limit
          }
        }
      );

      setCompanies(data.company);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      toast.error("Error getting company data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, [search, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when search is performed
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="custom-container my-12">
      <h1 className="text-3xl font-bold text-center mb-8 underline">
        Companies
      </h1>

      {/* Search Function */}
      <div className="flex items-center bg-white rounded-lg border-2 border-sky-500 w-[300px] mx-auto my-8 p-2">
        <FaSearch className="ml-3 text-gray-400" />
        <input
          type="text"
          className="w-[300px] p-2 text-sky-800 border-sky-600 border-none focus:outline-none"
          placeholder="Search with job title"
          value={search}
          onChange={(e)=>handleSearch(e)}
        />
      </div>

      {/* Companies Cards */}
        {
          loading?<Loader/> :<div>   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around gap-11">
          {Array.isArray(companies) && companies.length > 0 ? (
            companies.map((company, index) => (
              <CompanyCard key={index} company={company} />
            ))
          ) : (
            <p className="text-xl text-center">No Companies Found</p>
          )}
        </div>
  
        {/* Pagination */}
        <div className="mt-16 flex flex-col md:flex-row text-center gap-6 mx-auto max-w-[500px]">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="btn px-4 py-2 border-2 text-lg font-semibold hover:border duration-300 hover:border-accent bg-secondary hover:bg-hover hover:text-white rounded-lg"
          >
            Previous
          </button>
  
          <div className="space-x-2 flex mx-auto">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`btn px-4 py-2 border-2 text-lg font-semibold ${page === index + 1 ? "bg-primary  text-white" : "bg-secondary"} hover:border hover:bg-hover duration-300 hover:text-white rounded-lg`}
              >
                {index + 1}
              </button>
            ))}
          </div>
  
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="btn px-4 py-2 border-2 text-lg font-semibold hover:border duration-300 hover:border-accent bg-secondary hover:bg-hover hover:text-white rounded-lg"
          >
            Next
          </button>
        </div></div>
        }
    </div>
  );
};

export default Companies;
