import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { createClient, EntryCollection } from "contentful";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Layout } from "@/conponents/layout/Layout";
import { BlogCard } from "@/conponents/card/BlogCard";
import { BlogNavbar } from "@/conponents/sidebar/BlogNavbar";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const response: EntryCollection<IFields> = await client.getEntries({
    content_type: "blog",
  });

  return {
    props: {
      article: response.items,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ article }) => {
  const [articles, setArticles] = useState(article);
  const [active, setActive] = useState("");

  const handlerFilterCategory = (category: Category) => {
    if (category === "") {
      setArticles(article);
      setActive(category);
      return;
    }
    const newArray = article.filter((item) =>
      item.fields.type.includes(category)
    );
    setArticles(newArray);
    setActive(category);
  };

  return (
    <Layout>
      <Head>
        <title>Homepage</title>
      </Head>
      <div className="px-5 py-2">
        <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
          <div className="h-full col-span-12 p-4 text-base text-center bg-white  lg:col-span-3 rounded-2xl shadow-custom-light">
            <BlogNavbar
              handlerFilterCategory={handlerFilterCategory}
              active={active}
            />
          </div>
          <div className="flex flex-col col-span-12 overflow-hidden bg-white shadow-custom-light rounded-2xl lg:col-span-9">
            <div className="relative grid grid-cols-12 gap-4 my-3">
              {articles.map((item) => (
                <BlogCard key={item.sys.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full mt-5 justify-evenly">
        <p className="w-5 h-5 rounded-full animate-bounce bg-orange" />
        <p className="w-5 h-5 rounded-t-sm animate-spin bg-blue" />
        <p className="w-5 h-5 rounded-full animate-ping bg-purple" />
        <p className="w-5 h-5 rounded-full animate-pulse bg-subtext" />
        <p className="w-5 h-5 rounded-full animate-none bg-darkblue" />
      </div>
    </Layout>
  );
};

export default Home;
