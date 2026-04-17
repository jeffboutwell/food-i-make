"use client";

import React from "react";
import Search from "@/components/search";

export function SearchForm() {
  return (
    <Search
      applicationId="V1Z1S66I2G"
      apiKey="5e7e8ac555d4c0bb2a5c56fcbbc2043d"
      indexName="recipes_index"
      attributes={{
        primaryText: "name", // the attribute to display in the hits list
        secondaryText: "description", // the secondary attribute to display in the hits list
        tertiaryText: "categories.0.name", // the tertiary attribute to display in the hits list
        url: "url", // the URL of the hit
        image: "images.0.url", // the image URL of the hit
      }}
    />
  );
}
