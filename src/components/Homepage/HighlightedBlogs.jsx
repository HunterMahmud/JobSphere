"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogsCard from "../Blogs/BlogsCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Loader from "@/app/loading";


const HighlightedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Start loader
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/highlightedBlogs/api`);
        setBlogs(data.blogs); // Assuming API returns blogs in `data.blogs`
        setLoading(false); // Stop loader
      } catch (error) {
        setLoading(false); // Stop loader even if there's an error
        console.error("Error fetching data: ", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="custom-container mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-8">Highlighted Blogs</h1>

      {/* Show loader if data is still loading */}
      {loading ? (
        <Loader />
      ) : (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          autoplay={{
            delay: 3000, // Delay between auto slides in milliseconds
            disableOnInteraction: false, // Continue autoplay after manual interactions
          }}
          speed={1500} // Slow down the transition between slides (1500 milliseconds = 1.5 seconds)
          modules={[EffectCoverflow, Pagination, Autoplay]} // Include Autoplay module
          className="mySwiper"
        >
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog, i) => (
              <SwiperSlide key={i}>
                <BlogsCard blog={blog} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p className="text-center">No blogs found</p>
            </SwiperSlide>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default HighlightedBlogs;









// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BlogsCard from "../Blogs/BlogsCard";
// import Loader from "@/app/loading";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import { FreeMode, Pagination } from "swiper/modules";


// const HighlightedBlogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch blogs
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       setLoading(true); // Start loader
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/highlightedBlogs/api`);
//         setBlogs(data.blogs); // Assuming API returns blogs in `data.blogs`
//         setLoading(false); // Stop loader
//       } catch (error) {
//         setLoading(false); // Stop loader even if there's an error
//         console.error("Error fetching data: ", error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="custom-container mx-auto my-12">
//       <h1 className="text-3xl font-bold text-center mb-8">Highlighted Blogs</h1>

//       {/* Show loader if data is still loading */}
//       {loading ? (
//         <Loader />
//       ) : (
//         <Swiper
//           slidesPerView={3}
//           spaceBetween={30}
//           freeMode={true}
//           pagination={{
//             clickable: true,
//           }}
//           modules={[FreeMode, Pagination]}
//           className="mySwiper"
//         >
//           {Array.isArray(blogs) && blogs.length > 0 ? (
//             blogs.map((blog, i) => (
//               <SwiperSlide key={i}>
//                 <BlogsCard blog={blog} />
//               </SwiperSlide>
//             ))
//           ) : (
//             <SwiperSlide>
//               <p className="text-center">No blogs found</p>
//             </SwiperSlide>
//           )}
//         </Swiper>
//       )}
//     </div>
//   );
// };

// export default HighlightedBlogs;
