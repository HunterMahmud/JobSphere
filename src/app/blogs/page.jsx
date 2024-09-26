import BlogsCard from '@/components/Blogs/BlogsCard';
import React from 'react';

const BlogPage = () => {
  //bring Data from DataBase & Replace i
  const Blogs = [
    {
      id: 1,
      picture: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      subject: "The Future of Web Development",
      details: "This blog explores the latest trends in web development, including the rise of frameworks like Next.js and serverless architecture.",
      date: "2024-09-26"
    },
    {
      id: 2,
      picture: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      subject: "Mastering React: Tips and Tricks",
      details: "Learn some advanced techniques to improve your React applications, optimize performance, and structure your components effectively.",
      date: "2024-09-25"
    },
    {
      id: 3,
      picture: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      subject: "CSS in 2024: Modern Approaches",
      details: "A deep dive into the modern CSS techniques, such as CSS Grid, Flexbox, and the growing use of utility-first CSS frameworks like Tailwind.A deep dive into the modern CSS techniques, such as CSS Grid, Flexbox, and the growing use of utility-first CSS frameworks like Tailwind. ",
      date: "2024-09-24"
    }
  ];
  return (
    <div className="grid my-10 grid-cols-1 md:grid-cols-2 gap-5 px-2">
      {
        Blogs.map(Blog => <BlogsCard key={Blog.id} Blog={Blog} />)
      }



    </div>
  );
};

export default BlogPage;