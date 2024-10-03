"use client";
import MenuItem from "./MenuItem/MenuItem";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { LuScrollText } from "react-icons/lu";
import { GrProjects } from "react-icons/gr";
import { GiSkills } from "react-icons/gi";
import { AiOutlineRead } from "react-icons/ai";
import { PiCertificate } from "react-icons/pi";
import { MdOutlineLocalActivity, MdWorkOutline,MdOutlineAssuredWorkload } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaUsersViewfinder } from "react-icons/fa6";

const Sidebar = () => {
    const role = 'recruiter'
    return (
        <>
            {/* Sidebar */}
            <div className="bg-gray-200 w-full md:w-64 px-2">
                {/* Nav Items */}
                <div className="flex flex-col justify-between flex-1 ">
                    {/* Menu Items */}
                    {
                        role === 'user' &&
                        <nav>
                            <MenuItem icon={FaRegUser} label="Profile Overview" address="/profile/profile-overview" />
                            <MenuItem icon={HiOutlineInformationCircle} label="Personal Information" address="/profile/personal-information" />
                            <MenuItem icon={LuScrollText} label="Career Objective" address="/profile/career-objective" />
                            <MenuItem icon={GrProjects} label="Projects " address="/profile/projects" />
                            <MenuItem icon={GiSkills} label="Skills" address="/profile/skills" />
                            <MenuItem icon={AiOutlineRead} label="Education" address="/profile/education" />
                            <MenuItem icon={MdOutlineAssuredWorkload} label="Work Experience" address="/profile/work-experience" />
                            <MenuItem icon={PiCertificate} label="Certifications" address="/profile/certifications" />
                            <MenuItem icon={MdOutlineLocalActivity} label="Extra-Curricular Activity" address="/profile/extra-curricular-activity" />
                        </nav>
                    }
                    {
                        role === 'recruiter' &&
                        <nav>
                            <MenuItem icon={MdWorkOutline} label="Company Info" address="/profile/company-information" />
                            <MenuItem icon={RiContactsBook3Line} label="Contact Info" address="/profile/contact-information" />
                            <MenuItem icon={FaUsersViewfinder } label="Employment Info" address="/profile/employment-information" />
                        </nav>
                    }
                </div>
            </div >
        </>
    );
};

export default Sidebar;