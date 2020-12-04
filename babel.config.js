module.exports = {
	presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
	plugins: [
		['@babel/plugin-transform-flow-strip-types'],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		[
			'babel-plugin-root-import',
			{
				rootPathSuffix: 'src',
			},
		],
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					test: './test',
					underscore: 'lodash',
				},
			},
		],
	],
	env: {
		production: {
			plugins: [
				['@babel/plugin-transform-flow-strip-types'],
				['@babel/plugin-proposal-class-properties', { loose: true }],
				[
					'babel-plugin-root-import',
					{
						rootPathSuffix: 'src',
					},
				],
			],
		},
	},
}
