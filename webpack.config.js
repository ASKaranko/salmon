const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: [
					['@babel/preset-env',
						{
							'targets': {
								'edge': '17',
								'firefox': '60',
								'chrome': '67',
								'safari': '11.1',
								'ie': '11'
							},
							'useBuiltIns': 'usage'
						}]
				],
				plugins: [
					["@babel/plugin-proposal-class-properties"]
				]
			}
		}
	];

	if (isDev) {
		loaders.push('eslint-loader');
	}
	return loaders;
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: filename('js'),
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core'),
		},
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		port: 3000,
		hot: isDev,
		open: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			},
		}),
		new HtmlWebpackPlugin({
			filename: 'category.html',
			template: 'category.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			},
		}),
		new HtmlWebpackPlugin({
			filename: 'product.html',
			template: 'product.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			},
		}),
		new HtmlWebpackPlugin({
			filename: 'news.html',
			template: 'news.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			},
		}),
		new HtmlWebpackPlugin({
			filename: 'team.html',
			template: 'team.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			},
		}),
		new CopyPlugin({
			patterns: [
				{from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
				{from: path.resolve(__dirname, 'src/assets/images/'),
					to: path.resolve(__dirname, 'dist/assets/images/'),
				}
			],
		}),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				plugins: [
					['gifsicle', {interlaced: true}],
					['mozjpeg', {quality: 90}],
					['optipng', {optimizationLevel: 5}],
					[
						'svgo',
						{
							plugins: [
								{
									removeViewBox: false,
								},
							],
						},
					],
				],
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										"autoprefixer",
									],
								],
							},
						}
					},
					'sass-loader',
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
		],
	},
};
