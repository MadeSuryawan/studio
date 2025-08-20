import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
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
    // webpack: (config) => {
    //     config.ignoreWarnings = [
    //         ...(config.ignoreWarnings || []),
    //         /require.extensions is not supported by webpack/,
    //     ];
    //     return config;
    // },
    allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
};

export default nextConfig;
