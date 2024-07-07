module.exports = {
	'src/**/*.{ts,tsx}': () => 'npm run lint:types',
	'src/**/*.{ts,tsx,js,jsx}': 'npm run lint:eslint:fix',
	'src/**/*.{css,saas,scss}': 'npm run lint:stylelint:fix',
	'src/**/*.{ts,tsx,js,jsx,html,scss}': 'npm run lint:prettier',
};
