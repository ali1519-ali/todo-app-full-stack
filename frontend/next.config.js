/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports for GitHub Pages
  trailingSlash: true, // Add trailing slashes to URLs
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://ali1519-ali.github.io/todo-app-full-stack/api', // Updated for GitHub Pages
  },
  basePath: '/todo-app-full-stack', // Set basePath for GitHub Pages - always set this for GitHub subfolder
  assetPrefix: '/todo-app-full-stack/', // Set asset prefix for GitHub Pages - always set this for GitHub subfolder
};

module.exports = nextConfig;