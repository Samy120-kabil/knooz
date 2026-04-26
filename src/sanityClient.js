import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "8yzoiz20",
  dataset: "production",
  useCdn: true,          // CDN = أسرع في الـ production
  apiVersion: "2024-01-01",
  perspective: "published", // اعرض المحتوى المنشور فقط
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
