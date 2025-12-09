import type { MetadataRoute } from "next";

export function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.easygocab.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/services`,
    },
    {
      url: `${baseUrl}/about`,
    },
    {
      url: `${baseUrl}/privacy`,
    },
    {
      url: `${baseUrl}/terms`,
    },
    {
      url: `${baseUrl}/cancellation-policy`,
    },
    {
      url: `${baseUrl}/popular-routes`,
    },
    {
      url: `${baseUrl}/booking`,
    },
    {
      url: `${baseUrl}/taxi-list`,
    },
  ];
} 
