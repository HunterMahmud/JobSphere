"use client";
import { FaUser } from "react-icons/fa";
import MenuItem from "./MenuItem/MenuItem";

const Sidebar = () => {

    return (
        <>
            {/* Sidebar */}
            <div className="bg-gray-200 w-64 px-2">
                {/* Nav Items */}
                <div className="flex flex-col justify-between flex-1 ">
                    {/* Menu Items */}
                    <nav>
                        <MenuItem icon={FaUser} label="Profile Overview" address="/profile/profile-overview" />
                        <MenuItem icon={FaUser} label="Personal Information" address="/profile/personal-information" />
                        <MenuItem icon={FaUser} label="Career Objective" address="/profile/career-objective" />
                        <MenuItem icon={FaUser} label="Projects " address="/profile/projects" />
                        <MenuItem icon={FaUser} label="Skills" address="/profile/skills" />
                        <MenuItem icon={FaUser} label="Education" address="/profile/education" />
                        <MenuItem icon={FaUser} label="Work Experience" address="/profile/work-experience" />
                        <MenuItem icon={FaUser} label="Certifications" address="/profile/certifications" />
                        <MenuItem icon={FaUser} label="Extra-Curricular Activity" address="/profile/extra-curricular-activity" />
                    </nav>
                </div>
            </div >
        </>
    );
};

export default Sidebar;