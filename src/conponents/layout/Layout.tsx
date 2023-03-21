import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return <div className="container mx-auto">{children}</div>;
};
