import Link from 'next/link';
import React from 'react';

const BlogPage = () => {
    return (
        <div className="grid my-10 grid-cols-1 md:grid-cols-2">
            <article class="flex bg-white transition hover:shadow-xl dark:bg-gray-900 dark:shadow-gray-800/25 rounded-lg border-2 p-1">
                <div class="rotate-180 p-2 [writing-mode:_vertical-lr]">
                    <time
                        datetime="2022-10-10"
                        class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900 dark:text-white"
                    >
                        <span>date :</span>
                        <span class="w-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>
                        <span>Oct 10</span>
                        <span class="w-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>
                        
                    </time>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div class="block basis-2 md:basis-72">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                            class="aspect-square h-full w-full object-cover"
                        />
                    </div>

                    <div class="flex flex-1 flex-col justify-between">
                        <div
                            class="border-s border-gray-900/10 p-4 sm:!border-l-transparent sm:p-6 dark:border-white/10"
                        >
                            <a href="#">
                                <h3 class="font-bold uppercase text-gray-900 dark:text-white">
                                    Finding the right guitar for your style - 5 tips
                                </h3>
                            </a>

                            <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-gray-200">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                                pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                                quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius
                                atque dignissimos. Molestias explicabo corporis voluptatem?
                            </p>
                        </div>

                        <div class="sm:flex sm:items-end sm:justify-end">
                            <Link
                                href="#"
                                class="block bg-yellow-400 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-500"
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

export default BlogPage;