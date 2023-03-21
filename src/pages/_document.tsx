import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-fixed bg-slate-300 dark:bg-gradient-to-r dark:from-subtext dark:to-darkblue dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
