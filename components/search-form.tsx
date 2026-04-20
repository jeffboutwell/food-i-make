"use client";

import React from "react";
import Search from "@/components/search";

const applicationId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;

export function SearchForm() {
  if (!applicationId || !apiKey) {
    return null;
  }

  return (
    <Search
      applicationId={applicationId}
      apiKey={apiKey}
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
