import Banner from './Banner'
import Companies from './Companies';
import RecentJobs from './RecentJobs';
import SearchJobs from './SearchJobs';
import Reviews from './Reviews';
import HighlightedBlogs from './HighlightedBlogs';

const Homepage = () => {
  return (
    <div>
     <Banner/>
     <SearchJobs/>
     <RecentJobs/>
     <Reviews />
     <HighlightedBlogs/>
     <Companies/>

    </div>
  );
};

export default Homepage;
