

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
            {
              protocol: 'http',
              hostname: 'localhost',
              port: '1337',
            },
            
          ],
    }
};

export default nextConfig;
