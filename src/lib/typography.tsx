import { PropsWithChildren } from "react";

const H1: React.FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="text-5xl font-bold text-balance">{children}</h1>;
};

const H2: React.FC<PropsWithChildren> = ({ children }) => {
  return <h2 className="text-4xl font-bold text-balance">{children}</h2>;
};

const H3: React.FC<PropsWithChildren> = ({ children }) => {
  return <h3 className="text-2xl font-semibold text-balance">{children}</h3>;
};

const H4: React.FC<PropsWithChildren> = ({ children }) => {
  return <h4 className="text-xl font-normal text-balance">{children}</h4>;
};

const P: React.FC<PropsWithChildren> = ({ children }) => {
  return <p className="text-balance">{children}</p>;
};

export { H1, H2, H3, H4, P };
