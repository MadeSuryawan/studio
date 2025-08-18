import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
                pathname: "/**",
            },
        ],
    },
    productionBrowserSourceMaps: false,
    webpack: (config) => {
        config.ignoreWarnings = [
            ...(config.ignoreWarnings || []),
            /require.extensions is not supported by webpack/,
        ];
        return config;
    },
};

export default nextConfig;
