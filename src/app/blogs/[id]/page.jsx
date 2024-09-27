import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const BlogDetails = () => {
    // Load the blog According to id & remove it 
    const Blog = {
        id: 1,
        picture: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        subject: "The Future of Web Development",
        details: "This blog explores the latest trends in web development, including the rise of frameworks like Next.js and serverless architecture.",
        date: "2024-09-26"
      }
    const {id ,picture ,subject, details, date}=Blog
    return (
        <div className='container mx-auto my-10'>
            <article className =" bg-slate-100 transition hover:shadow-xl dark:bg-gray-900 dark:shadow-gray-800/25 rounded-lg border-2 p-3">
                <div className =" p-2 ">
                    <time

                        className ="flex items-center  gap-4 text-xs font-bold uppercase text-gray-900 dark:text-white"
                    >
                        <span>date :</span>
                        <span className ="h-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>
                        <span>{date}</span>
                        <span className ="h-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>

                    </time>
                </div>

                <div className ="flex flex-col md:flex-row">
                    <div className ="block basis-2 md:basis-72">
                        <Image
                            alt="pic"
                            src={picture}
                            width={600}
                            height={500}
                            className ="aspect-square h-full w-full object-cover"
                        />
                    </div>

                    <div className ="flex flex-1 flex-col justify-between">
                        <div
                            className ="border-s border-gray-900/10 p-4 sm:!border-l-transparent sm:p-6 dark:border-white/10"
                        >
                            <Link href="#">
                                <h3 className ="font-bold uppercase text-gray-900 dark:text-white">
                                   {subject}
                                </h3>
                            </Link>

                            <p className ="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-gray-200">
                               {details}
                            </p>
                        </div>

                        <div className ="sm:flex sm:items-end sm:justify-end">
                            <Link
                                href="#"
                                className ="block bg-blue-600 px-5 py-3 text-center text-xs font-bold uppercase text-slate-100 transition hover:bg-blue-800 rounded-md"
                            >
                                Done
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogDetails;