module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order', 'stylelint-config-prettier-scss'],
	plugins: ['stylelint-order'],
	rules: {
		'no-empty-source': null,
		'media-feature-range-notation': 'prefix',
		'selector-class-pattern': null,
		'keyframes-name-pattern': null,
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
	},
};
