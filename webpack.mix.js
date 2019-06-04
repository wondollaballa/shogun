const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/app.ts', 'public/js')
	.ts('resources/js/admin_dashboard.ts', 'public/js')
	.ts('resources/js/frontend.ts', 'public/js')
    .ts('resources/js/admin_signin.ts', 'public/js')
    .ts('resources/js/globals/edit.ts', 'public/js')
	.sass('resources/sass/admin.scss', 'public/css')
	.sass('resources/sass/signin.scss', 'public/css')
	.sass('resources/sass/frontend.scss', 'public/css')
	.sass('resources/sass/home_edit.scss', 'public/css')
	.options({
		processCssUrls: false
	})
	.webpackConfig({
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					options: {
						appendTsSuffixTo: [/\.vue$/]
					},
					exclude: /node_modules/,
				},

			],
			loaders: [
				{
					test: /\.worker\.ts$/,
					use: { loader: 'worker-loader' }
				},
			]
		},
		resolve: {
			extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
		}
	}).sourceMaps();
