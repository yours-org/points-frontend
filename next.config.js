/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				os: false,
				path: false,
				module: false
			}
		}

		config.experiments = { asyncWebAssembly: true, layers: true }

		return config
	}
}

module.exports = nextConfig
