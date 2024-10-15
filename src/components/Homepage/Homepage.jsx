
import Banner from './Banner'
import Companies from './Companies';
import RecentJobs from './RecentJobs';
import Reviews from './Reviews';
const Homepage = () => {
  return (
    <div>
     <Banner/>
     <RecentJobs/>
    
     <Companies/>
     <Reviews></Reviews>
    </div>
  );
};

export default Homepage;
