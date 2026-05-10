import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fuck-ai.space",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]
}
