type ArticleLDProps = {
  title: string;
  description?: string;
  url: string;
  datePublished: string;
  category?: string;
};

export default function ArticleLD({
  title,
  description,
  url,
  datePublished,
  category,
}: ArticleLDProps) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    headline: title,
    description,
    url,
    datePublished,
    dateModified: datePublished,
    articleSection: category,
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
