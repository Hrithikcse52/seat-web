/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "wxmwctiasizeoqlubrjn.supabase.co",
      "tuk-cdn.s3.amazonaws.com",
      "cdn.tuk.dev",
    ],
  },
};

module.exports = nextConfig;
