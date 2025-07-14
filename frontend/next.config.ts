/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export',
  env: {
    // NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_BASE_URL: "https://demo-backend-app.azurewebsites.net"
  },
};

module.exports = nextConfig;
