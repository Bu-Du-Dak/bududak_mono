import type { MetadataRoute } from "next";
import { WORKS } from "../constants/works";

const SITE_URL = "https://playground.bududak.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL },
    ...WORKS.map(({ id }) => ({ url: `${SITE_URL}/${id}` })),
  ];
}
