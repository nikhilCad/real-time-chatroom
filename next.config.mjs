/** @type {import('next').NextConfig} */
const nextConfig = {

  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config;
  },
  
    //allow uploadthing uploads
    images: {
    domains: [
      "uploadthing.com",
      "utfs.io"
    ]
  },
};

export default nextConfig;
