/** @type {import('next').NextConfig} */
const nextConfig = {
  // Commenting out export settings for development
  // output: 'export', // Enable static exports
  // trailingSlash: true, // Add trailing slashes to URLs
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
  // Commenting out basePath for development
  // basePath: '/todo-full-stack-web-application-with-neon-db',
  // assetPrefix: '/todo-full-stack-web-application-with-neon-db',
};

module.exports = nextConfig;