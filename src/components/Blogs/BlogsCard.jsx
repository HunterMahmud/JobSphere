import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogsCard = ({ blog }) => {
  // console.log(blog);
  const {
    _id,
    author,
    blogImage,
    content,
    publishedDate,
    title,
  } = blog;
  return (
    <div>
      <article className="bg-accent transition hover:shadow-xl  border-accent md:min-h-[340px] dark:shadow-gray-800/25 rounded-lg border-2 p-2">
        <div className="p-2 ">
          <time className="items-center p-2 gap-4 text-xs font-bold uppercase text-sky-900">
            <span>Date :</span>
            <span className="h-px flex-1"></span>
            <span>{new Date(publishedDate).toLocaleDateString()+ " " + new Date(publishedDate).toLocaleTimeString()}</span>
            <span className="h-px flex-1"></span>
          </time>
          <div className="items-center p-2 gap-4 text-md font-bold uppercase text-sky-900">
            <span>Author:</span>
            <span className="h-px flex-1">{' '}{author}</span>
           
            
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="block basis-2 md:basis-72">
            <Image
              alt={title}
              src={blogImage}
              className="aspect-square h-full w-full object-cover"
              height={500}
              width={500}
              priority
            />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="border-s border-gray-900/10 p-2 sm:!border-l-transparent sm:p-6 dark:border-white/10">
              <Link href={`blogs/${_id}`}>
                <h3 className="font-bold text-xl uppercase text-gray-900">
                  {title}
                </h3>
              </Link>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                {content.split(" ").slice(0, 30).join(" ")}
              </p>
            </div>

            <div className="flex items-end justify-end sm:items-end sm:justify-end mt-3 mr-6">
              <Link
                href={`blogs/${_id}`}
                className="block bg-primary px-5 py-3 text-center text-xs font-bold uppercase text-slate-100 transition hover:bg-hover rounded-md"
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
