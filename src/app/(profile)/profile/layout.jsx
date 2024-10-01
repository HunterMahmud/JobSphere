import ProfileSidebar from "@/components/Dashboard/Sidebar/ProfileSidebar";


const DashboardLayout = ({ children }) => {

    return (
        <div className='custom-container min-h-[calc(100vh-318px)] flex flex-col md:flex-row'>
            {/* sidebar */}
            <ProfileSidebar />
            {/* Children */}
            <div className='flex-1'>
                <div className='p-5'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;