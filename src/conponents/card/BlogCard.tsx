import React, { useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { Entry } from "contentful";
import Link from "next/link";
import { XIcon } from "@heroicons/react/solid";

export const BlogCard: NextPage<{ item: Entry<any> }> = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <>
      <div
        //href={"/blog/" + item.fields.slug}
        className="col-span-12 p-2 bg-gray-200 rounded-lg sm:col-span-6 lg:col-span-4 cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        {item.fields.thumbnail && (
          <Image
            src={"https:" + item.fields.thumbnail.fields.file.url}
            alt={item.fields.title}
            className="object-contain cursor-pointer"
            height="300"
            width="400"
          />
        )}
        <p className="my-2 text-center dark:text-black">{item.fields.title}</p>
      </div>
      {showDetail && (
        <div className="absolute top-0 left-0 z-10 grid w-full h-full p-2 text-black bg-white md:grid-cols-2 gap-x-12 dark:text-black">
          {item.fields.thumbnail && (
            <Image
              className="object-contain"
              src={"https:" + item.fields.thumbnail.fields.file.url}
              alt={item.fields.title}
              height="150"
              width="300"
            />
          )}

          <div className="flex justify-center space-x-3">
            <Link
              href={"/blog/" + item.fields.slug}
              className="flex items-center px-4 space-x-3 text-xl +font-bold bg-gray-200 hover:text-orange"
            >
              詳細を見る
            </Link>
            <div className="flex items-center text-sm">
              {item.fields.type &&
                item.fields.type.map((tech: any) => (
                  <span key={tech} className="px-2 py-1 my-1 text-subtext">
                    [{tech}]
                  </span>
                ))}
            </div>
          </div>

          <button
            onClick={() => setShowDetail(false)}
            className="absolute bg-gray-200 rounded-full top-3 right-3 focus:outline-none"
          >
            <XIcon className="h-8" />
          </button>
        </div>
      )}
    </>
  );
};
