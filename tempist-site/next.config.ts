import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/obsidian-capital-site/platforms/tempist",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
