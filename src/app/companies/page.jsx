"use client";

import CompanyCard from "@/components/Companies/CompanyCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
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
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/companies/api`,
        {
          params: {
            search,
            page,
            limit,
          },
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
      <h1 className="text-3xl font-bold text-center mb-8">Companies</h1>

      {/* Search Function */}
      <div className="flex items-center bg-white rounded-lg border-2 border-accent w-[300px] mx-auto my-8 p-2">
        <FaSearch className="ml-3 text-gray-400" />
        <input
          type="text"
          className="w-[300px] p-2 border-none focus:outline-none"
          placeholder="Search with company name"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {/* Companies Cards */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around gap-11">
            {Array.isArray(companies) && companies.length > 0 ? (
              companies.map((company, index) => (
                <CompanyCard key={index} company={company} />
              ))
            ) : (
              <p className="text-xl text-center">No Companies Found</p>
            )}
          </div>
          {/* Pagination */}
          
          {
           companies.length > 0 &&   <div className="mt-16 flex justify-center gap-1 md:gap-3 lg:gap-6">
           <button
             onClick={() => handlePageChange(page - 1)}
             disabled={page === 1}
             className="btn px-2 py-2 border-2 text-xs lg:text-lg font-semibold bg-primary hover:bg-hover rounded-lg text-white"
           >
             <GrPrevious/>
           </button>
           <div className="space-x-2">
             {Array.from({ length: totalPages }, (_, index) => (
               <button
                 key={index + 1}
                 onClick={() => handlePageChange(index + 1)}
                 className={`btn px-3 py-2 border-2 text-xs lg:text-lg font-semibold hover:bg-hover  rounded-lg  ${
                   page === index + 1 ? "text-primary bg-white border hover:text-white border-primary" : "bg-primary text-white"
                 }`}
               >
                 {index + 1}
               </button>
             ))}
           </div>
           <button
             onClick={() => handlePageChange(page + 1)}
             disabled={page === totalPages}
             className="btn px-2 py-2 border-2 text-xs lg:text-lg font-semibold   bg-primary hover:bg-hover rounded-lg text-white"
           >
             <GrNext/>
           </button>
         </div> 
          }
        </div>
      )}
    </div>
  );
};

export default Companies;


