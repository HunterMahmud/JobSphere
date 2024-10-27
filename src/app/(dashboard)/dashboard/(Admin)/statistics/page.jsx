import JobPostingsChart from '@/components/Chart/JobPostingsChart';
import AppliedJobsChart from '@/components/Chart/AppliedJobsChart';
import OverviewCard from '@/components/OverviewCard/OverviewCard';

const Statistics = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div>
                <OverviewCard/>
            </div>
            <div className="lg:flex gap-6">
            <JobPostingsChart/>
            <AppliedJobsChart/>
            </div>
        </div>
    );
};

export default Statistics;
