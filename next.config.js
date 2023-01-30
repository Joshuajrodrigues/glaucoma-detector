/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
    return config;
  },
}