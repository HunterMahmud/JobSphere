import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogsCard = ({ blog }) => {
  // console.log(blog);
  const { _id, author, blogImage, content, publishedDate, title } = blog;
  return (
    <div>
      <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <Image 
              alt={title}
              src={blogImage}
              className="aspect-square h-[250px] w-full object-cover"
              height={500}
              width={500}
              priority />

        <div className="bg-white p-4 sm:p-6">
          <time datetime={new Date(publishedDate).toLocaleDateString()} className="block text-gray-500">
            {new Date(publishedDate).toLocaleDateString() + " " + new Date(publishedDate).toLocaleTimeString()}
          </time>

          <Link href={`blogs/${_id}`}>
            <h3 className="mt-0.5 text-xl lg:text-2xl text-gray-900 font-bold hover:underline">
              {title}
            </h3>
          </Link>
          <p>{author}</p>
          <p className="mt-2 line-clamp-3 text-base/relaxed text-gray-500">
            {content}
          </p>
         
              <Link
                href={`blogs/${_id}`}
                className="block mt-4 bg-primary px-5 py-3 text-center text-xs font-bold uppercase text-slate-100 transition hover:bg-hover rounded-md"
              >
                Read Blog
              </Link>
            
        </div>
       
      </article>
    </div>
  );
};

export default BlogsCard;