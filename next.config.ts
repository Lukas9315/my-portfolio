import type { NextConfig } from "next";

// GitHub Pages serwuje stronę pod /<nazwa-repo>, więc w CI ustawiamy
// NEXT_PUBLIC_BASE_PATH. Lokalnie zostaje pusty i wszystko działa z "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
};

export default nextConfig;
