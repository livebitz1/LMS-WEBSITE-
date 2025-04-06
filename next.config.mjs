/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['ap-south-1.graphassets.com'],
    },
    reactStrictMode: true,
    trailingSlash: true, // Optional: helps with some 404 issues
    output: 'standalone', // If deploying as a serverless app
  };
  
  export default nextConfig;
  