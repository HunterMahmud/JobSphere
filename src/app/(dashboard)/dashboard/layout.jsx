import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";


const DashboardLayout = ({ children }) => {

    return (
        <div className='relative min-h-screen mf:flex'>
            {/* sidebar */}
            <Sidebar />
            {/* Children */}
            <div className='flex-1 md:ml-64'>
                <div className='p-5'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;