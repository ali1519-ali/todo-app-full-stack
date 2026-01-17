/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports for GitHub Pages
  trailingSlash: true, // Add trailing slashes to URLs
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://todo-full-stack-web-application-with-neon-db-main.vercel.app',
  },
  basePath: process.env.NODE_ENV === 'production' ? '/todo-app-full-stack' : '', // Set basePath for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/todo-app-full-stack/' : '/', // Set asset prefix for GitHub Pages
};

module.exports = nextConfig;