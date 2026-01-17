/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports for GitHub Pages
  trailingSlash: true, // Add trailing slashes to URLs
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080', // Using localhost as default since GitHub Pages won't host the backend
  },
  basePath: '/todo-app-full-stack', // Set basePath for GitHub Pages - always set this for GitHub subfolder
  assetPrefix: '/todo-app-full-stack/', // Set asset prefix for GitHub Pages - always set this for GitHub subfolder
};

module.exports = nextConfig;