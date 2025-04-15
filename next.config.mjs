

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'todo-app-cms.onrender.com',
              port: '',
            },
          ],
    }
};

export default nextConfig;
