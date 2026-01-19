import React from "react";
import { Logo } from "../../atoms/logo/logo";
import Image from "next/image";
import grilledCheese from "@/public/grilled-cheese.webp";

export const Home = () => {
  return (
    <section className="Home flex flex-col w-full text-center">
      <h1>
        <Logo size={"lg"} asLink={true} />
      </h1>
      <Image
        src={grilledCheese}
        width={1200}
        height={600}
        alt="Vegan Grilled Cheese"
      />
    </section>
  );
};
