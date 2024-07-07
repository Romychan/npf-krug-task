module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
		'plugin:@conarti/feature-sliced/recommended',
		'plugin:storybook/recommended',
	],
	ignorePatterns: ['dist', 'build', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'@typescript-eslint/no-unused-vars': 'warn',
		'no-unused-vars': 'off',
		'linebreak-style': 0,
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				groups: ['builtin', 'external', 'internal', 'parent', ['sibling', 'index']],
				pathGroups: [
					'~/processes/**',
					'~/pages/**',
					'~/widgets/**',
					'~/features/**',
					'~/entities/**',
					'~/shared/**',
				].map((pattern) => ({
					pattern,
					group: 'internal',
					position: 'before',
				})),
				pathGroupsExcludedImportTypes: ['builtin'],
			},
		],
	},
};
