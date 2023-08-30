const path = require('path')


/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [
            path.join(__dirname, '/src/app/styles'), 
            path.join(__dirname, 'node_modules/normalize-scss/sass/')
        ],
    },
    images: {
		domains: ['cdn.sanity.io']
	}
}

module.exports = nextConfig
