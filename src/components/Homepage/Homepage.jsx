import Banner from './Banner'
import Companies from './Companies';
import RecentJobs from './RecentJobs';
import Reviews from './Reviews';
import HighlightedBlogs from './HighlightedBlogs';

const Homepage = () => {
  return (
    <div>
     <Banner/>
     <RecentJobs/>
    
     <Companies/>
     <Reviews />
     <HighlightedBlogs/>
    </div>
  );
};

export default Homepage;
