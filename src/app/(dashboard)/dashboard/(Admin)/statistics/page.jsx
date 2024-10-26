import JobPostingsChart from '@/components/Chart/JobPostingsChart';
import AppliedJobsChart from '@/components/Chart/AppliedJobsChart';

const Statistics = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* <div className="md:flex gap-6">
                <div className="md:w-1/2 h-[400px] flex items-center justify-center">
                    <JobPostingsChart className="w-full h-full" />
                </div>
                <div className="md:w-1/2 h-[400px] flex items-center justify-center">
                    <AppliedJobsChart className="w-full h-full" />
                </div>
            </div> */}
            <div className="lg:flex gap-6">
            <JobPostingsChart/>
            <AppliedJobsChart/>
            </div>
        </div>
    );
};

export default Statistics;
