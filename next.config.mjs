/** @type {import('next').NextConfig} */
const nextConfig = {
    //allow uploadthing uploads
    images: {
    domains: [
      "uploadthing.com",
      "utfs.io"
    ]
  },
};

export default nextConfig;
