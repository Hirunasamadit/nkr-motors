import { generateAllStructuredData } from "@/lib/seo";

export function StructuredData() {
  const structuredData = generateAllStructuredData();

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
