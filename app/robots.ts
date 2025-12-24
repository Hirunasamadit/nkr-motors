import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nkr.lk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          // Block all suspicious paths detected by Google
          "/-nordazldldm/",
          "/cdisps/",
          "/csmspppocad/",
          "/homepqk/",
          "/mordatillo/",
          "/qmqpoqt/",
          "/securess/",
          "/F004f19441/",
          "/*.php",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}


