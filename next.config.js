/** @type {import('next/dist/next-server/server/config').NextConfig} */
const config = {
  target: process.env.NODE_ENV === 'production' ? 'serverless' : 'server',
  webpack: (config, { isServer }) => {
    config.module.rules.push({ test: /\.md$/, use: 'raw-loader' })
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    return config
  }
}

module.exports = config
