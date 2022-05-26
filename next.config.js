/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["wxmwctiasizeoqlubrjn.supabase.co", "tuk-cdn.s3.amazonaws.com", "cdn.tuk.dev", "www.hyperui.dev"],
  },
};

module.exports = nextConfig;
