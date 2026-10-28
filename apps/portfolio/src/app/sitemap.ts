import type { MetadataRoute } from "next";
import { FEATURED_PROJECTS } from "../constants/projects";

const SITE_URL = "https://portfolio.bududak.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL },
    ...FEATURED_PROJECTS.map(({ id }) => ({ url: `${SITE_URL}/${id}` })),
  ];
}
