/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: ["vvnlsnaghsjqiaesguni.supabase.co"],
	},
};

module.exports = nextConfig;
