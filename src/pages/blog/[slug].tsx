import React from "react";
import type { NextPage } from "next";
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from "next";
import { createClient, EntryCollection } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { format } from "date-fns";

import { Layout } from "@/conponents/layout/Layout";
import Image from "next/image";
import Link from "next/link";

const config = {
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
};
const client = createClient(config);

export const getStaticPaths: GetStaticPaths = async () => {
  const res: EntryCollection<IResponse> = await client.getEntries({
    content_type: "blog",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });
  return {
    props: { article: items[0] },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Article: NextPage<Props> = ({ article }) => {
  return (
    <Layout>
      <>
        <p>
          <Link href="/">トップへ</Link>
        </p>
        <h1 className="text-3xl font-bold underline">{article.fields.title}</h1>
        <p>{format(new Date(article.fields.date), "yyyy/MM/dd")}</p>
        <div>
          {documentToReactComponents(article.fields.content, {
            renderNode: {
              // eslint-disable-next-line react/display-name
              [BLOCKS.EMBEDDED_ASSET]: (node) => (
                <Image
                  src={"https:" + node.data.target.fields.file.url}
                  width={400}
                  height={300}
                  alt=""
                />
              ),
            },
          })}
        </div>
      </>
    </Layout>
  );
};

export default Article;
