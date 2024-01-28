/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        BASE_URL:
            process.env.NODE_ENV === "production"
                ? "https://tracker.iamharshil.vercel.app"
                : "http://localhost:3000",
    },
};

export default nextConfig;
