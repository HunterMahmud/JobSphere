
import Banner from './Banner'
import Companies from './Companies';
import RecentJob from './RecentJobSection';
import Reviews from './Reviews';
const Homepage = () => {
  return (
    <div>
     <Banner/>
     <RecentJob/>
     <Companies/>
     <Reviews></Reviews>
    </div>
  );
};

export default Homepage;
