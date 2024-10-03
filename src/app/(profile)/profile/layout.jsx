import ProfileSidebar from "@/components/Dashboard/Sidebar/ProfileSidebar";


const DashboardLayout = ({ children }) => {

    return (
        <div className='custom-container min-h-[calc(100vh-318px)] flex flex-col md:flex-row py-4 gap-5 rounded-lg'>
            {/* sidebar */}
            <ProfileSidebar />
            {/* Children */}
            <div className='flex-1 bg-gray-200'>
                <div className='p-5'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;