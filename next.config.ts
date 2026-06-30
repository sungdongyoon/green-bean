import type { NextConfig } from "next";
import createNextintlPlugin from "next-intl/plugin";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
};

const withNextIntl = createNextintlPlugin();

export default withNextIntl(nextConfig);
