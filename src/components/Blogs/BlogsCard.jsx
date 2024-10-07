import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogsCard = ({ Blog }) => {
    const {title, author, date, content, tags}=Blog
    return (
        <div>
            <article className ="bg-slate-100 transition hover:shadow-xl dark:bg-sky-50 border-sky-600 md:min-h-[340px] dark:shadow-gray-800/25 rounded-lg border-2 p-2">
                <div className ="p-2 ">
                    <time

                        className ="items-center p-2 gap-4 text-xs font-bold uppercase text-sky-900 dark:text-sky-900"
                    >
                        <span>date :</span>
                        <span className ="h-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>
                        <span>{date}</span>
                        <span className ="h-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>

                    </time>
                    <div

                        className ="items-center p-2 gap-4 text-lg font-bold uppercase text-sky-900 dark:text-sky-900"
                    >
                        <span>Author Name:</span>
                        <span className ="h-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>
                        <span>{" "} {author}</span>
                        <span className ="h-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>

                    </div>
                </div>

                <div className ="flex flex-col md:flex-row">
                    {/* <div className ="block basis-2 md:basis-72">
                        <Image
                            alt="pic"
                            src={picture}
                            className ="aspect-square h-full w-full object-cover"
                            height={500}
                            width={500}
                            priority 
                        />
                    </div> */}

                    <div className ="flex flex-1 flex-col justify-between">
                        <div
                            className ="border-s border-gray-900/10 p-2 sm:!border-l-transparent sm:p-6 dark:border-white/10"
                        >
                            <Link href="#">
                                <h3 className ="font-bold text-xl uppercase text-gray-900 dark:text-sky-900">
                                   {title}
                                </h3>
                            </Link>

                            <p className ="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-sky-900">
                               {content.split(" ").slice(0, 30).join(" ")}
                            </p>
                        </div>
 
                        <div className ="flex items-end justify-end sm:items-end sm:justify-end mt-3 mr-6">
                            <Link
                                href={`blogs`}
                                className ="block bg-blue-600 px-5 py-3 text-center text-xs font-bold uppercase text-slate-100 transition hover:bg-blue-800 rounded-md"
                            >
                                Read Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogsCard;