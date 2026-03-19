const SITE_URL = "https://portfolio.bududak.com";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
    },
  ];
}
