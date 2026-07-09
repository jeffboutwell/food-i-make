"use client";

import React from "react";
import Search from "@/lib/components/search";

const applicationId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;

function normalizeHitUrl(url: unknown): string {
  if (typeof url !== "string" || !url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

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
        tertiaryText: "categories.name", // all category names for the tertiary attribute
        url: "url", // the URL of the hit
        image: "images.0.url", // the image URL of the hit
      }}
      transformItems={(items) =>
        items.map((item) => ({
          ...item,
          url: normalizeHitUrl((item as { url?: unknown }).url),
        }))
      }
    />
  );
}
