// components/FilterDrawer.jsx

import React from "react";
import { Range } from 'react-range';

const FilterDrawer = ({ experienceRange, setExperienceRange, cities, city, handleCityChange, skills, skill, handleSkillChange, isOpen, closeDrawer }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`fixed bg-[#f2f2f2]  left-0 top-0 w-3/4 md:w-1/4 h-full p-6 transition-transform ${isOpen ? "transform-none" : "-translate-x-full"}`}>
        <h2 className="text-xl md:text-xl font-bold my-4">Filters</h2>

        {/* Experience Range Slider */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="text-lg md:text-xl font-bold">Experience Range</div>
          <Range
            step={1}
            min={0}
            max={10}
            values={experienceRange}
            onChange={(values) => setExperienceRange(values)}
            renderTrack={({ props, children }) => (
              <div {...props} className="w-full h-2 bg-gray-300 rounded-lg">
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="w-6 h-6 bg-blue-500 rounded-full shadow-lg"
              />
            )}
          />
          <div className="flex justify-between w-full">
            <input
              type="number"
              value={experienceRange[0]}
              min="0"
              max="10"
              onChange={(e) =>
                setExperienceRange([parseInt(e.target.value), experienceRange[1]])
              }
              className="w-16 text-center bg-white border-2 border-primary rounded-md"
            />
            <input
              type="number"
              value={experienceRange[1]}
              min="0"
              max="10"
              onChange={(e) =>
                setExperienceRange([experienceRange[0], parseInt(e.target.value)])
              }
              className="w-16 text-center bg-white border-2 border-primary rounded-md"
            />
          </div>
        </div>

        {/* City Filter Dropdown */}
        <div className="bg-white w-full rounded-lg border-2 border-primary p-2 mb-4">
          <select
            value={city}
            onChange={handleCityChange}
            className="w-full p-2 text-sky-800 border-none focus:outline-none"
          >
            <option value="">All Cities</option>
            {cities.map((cityObj, index) => (
              <option key={index} value={cityObj.city}>
                {cityObj.city}
              </option>
            ))}
          </select>
        </div>

        {/* Skills Filter Dropdown */}
        <div className="bg-white w-full rounded-lg border-2 border-primary p-2">
          <select
            value={skill}
            onChange={handleSkillChange}
            className="w-full p-2 text-sky-800 border-none focus:outline-none"
          >
            <option value="">All Skills</option>
            {skills.map((skillObj, index) => (
              <option key={index} value={skillObj.skill}>
                {skillObj.skill}
              </option>
            ))}
          </select>
        </div>

        <button onClick={closeDrawer} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

export default FilterDrawer;
