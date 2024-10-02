"use client";
import MenuItem from "./MenuItem/MenuItem";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { LuScrollText } from "react-icons/lu";
import { GrProjects } from "react-icons/gr";
import { GiSkills } from "react-icons/gi";
import { AiOutlineRead } from "react-icons/ai";
import { MdOutlineAssuredWorkload } from "react-icons/md";
import { PiCertificate } from "react-icons/pi";
import { MdOutlineLocalActivity } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const Sidebar = () => {

    return (
        <>
            {/* Sidebar */}
            <div className="bg-gray-200 w-full md:w-64 px-2">
                {/* Nav Items */}
                <div className="flex flex-col justify-between flex-1 ">
                    {/* Menu Items */}
                    <nav>
                        <MenuItem icon={FaRegUser } label="Profile Overview" address="/profile/profile-overview" />
                        <MenuItem icon={HiOutlineInformationCircle} label="Personal Information" address="/profile/personal-information" />
                        <MenuItem icon={LuScrollText} label="Career Objective" address="/profile/career-objective" />
                        <MenuItem icon={GrProjects} label="Projects " address="/profile/projects" />
                        <MenuItem icon={GiSkills} label="Skills" address="/profile/skills" />
                        <MenuItem icon={AiOutlineRead} label="Education" address="/profile/education" />
                        <MenuItem icon={MdOutlineAssuredWorkload} label="Work Experience" address="/profile/work-experience" />
                        <MenuItem icon={PiCertificate} label="Certifications" address="/profile/certifications" />
                        <MenuItem icon={MdOutlineLocalActivity} label="Extra-Curricular Activity" address="/profile/extra-curricular-activity" />
                    </nav>
                </div>
            </div >
        </>
    );
};

export default Sidebar;